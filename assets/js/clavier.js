/* Clavier 3D de l'accueil : une touche par entrée de OUTILS (data.js).
   Si WebGL ou Three.js ne sont pas disponibles, la grille CSS de repli reste affichée. */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const zone = document.getElementById("clavier");
const info = document.getElementById("info-touche");
const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
const tactile = matchMedia("(hover: none)").matches;

/* Couleurs des touches par catégorie : [capuchon, encre des icônes mono] */
const PALETTE = [
  ["#dfe6ff", "#1c2b6b"],  // bleu pâle
  ["#f1efe7", "#1b1c22"],  // crème
  ["#e6dcff", "#3b1f7a"],  // lilas
  ["#262933", "#e9ebf2"],  // graphite
  ["#e2e4ea", "#1b1c22"]   // gris clair
];
const U = 1;          // largeur d'une touche standard
const JEU = 0.1;      // espace entre deux touches
const LARGEUR_RANGEE = 5.5;

function disponible() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) { return false; }
}

/* Répartit les touches en rangées */
function disposition(outils) {
  const rangees = [[]];
  let courant = 0;
  for (const o of outils) {
    const w = o.largeur || 1;
    if (courant + w > LARGEUR_RANGEE + 1e-6 && rangees.at(-1).length) { rangees.push([]); courant = 0; }
    rangees.at(-1).push(o);
    courant += w;
  }
  return rangees;
}

/* Charge un logo ; les icônes « mono-… » sont recolorées avec l'encre de la touche */
async function chargerLogo(logo, encre) {
  const url = `assets/img/logos/${logo}.svg`;
  let src = url;
  if (logo.startsWith("mono-")) {
    const svg = (await (await fetch(url)).text()).replaceAll("currentColor", encre);
    src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  }
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

/* Texture imprimée sur une touche : le logo de l'outil, ou son nom à défaut */
function etiquette(outil, largeur, couleur) {
  const px = 256;
  const c = document.createElement("canvas");
  c.width = Math.round(px * largeur); c.height = px;
  const g = c.getContext("2d");
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (outil.logo) {
    chargerLogo(outil.logo, couleur).then(img => {
      const cote = px * 0.56;
      g.drawImage(img, (c.width - cote) / 2, (px - cote) / 2, cote, cote);
      t.needsUpdate = true;
    }).catch(() => texte(g, c, outil.touche || outil.nom, couleur, t));
    return t;
  }
  texte(g, c, outil.touche || outil.nom, couleur, t);
  return t;
}

function texte(g, c, mot, couleur, t) {
  const px = c.height;
  let taille = 84;
  const police = n => `600 ${n}px "Geist Mono", ui-monospace, monospace`;
  g.font = police(taille);
  while (g.measureText(mot).width > c.width * 0.82 && taille > 36) g.font = police(--taille);
  g.fillStyle = couleur;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(mot, c.width / 2, px / 2 + 4);
  t.needsUpdate = true;
}

async function demarrer() {
  if (!zone || !disponible() || typeof OUTILS === "undefined") return;
  await Promise.race([document.fonts?.ready, new Promise(r => setTimeout(r, 1500))]);

  const cats = [...new Set(OUTILS.map(o => o.cat))];
  const rangees = disposition(OUTILS);

  /* Scène */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  const VISEE = new THREE.Vector3(0, -0.4, 1.1);

  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1a1b25, 1.1));
  const soleil = new THREE.DirectionalLight(0xffffff, 2.2);
  soleil.position.set(-4, 9, 5);
  soleil.castShadow = true;
  soleil.shadow.mapSize.set(1024, 1024);
  Object.assign(soleil.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 });
  soleil.shadow.radius = 4;
  scene.add(soleil);
  const contre = new THREE.PointLight(0x8ea6ff, 30, 20);
  contre.position.set(4, 3, -4);
  scene.add(contre);

  /* Clavier */
  const clavier = new THREE.Group();
  scene.add(clavier);

  const profondeur = rangees.length * U;
  const largeur = LARGEUR_RANGEE * U;
  const materiauPlaque = new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.6 });
  const plaque = new THREE.Mesh(new RoundedBoxGeometry(largeur + 0.6, 0.45, profondeur + 0.6, 4, 0.22), materiauPlaque);
  plaque.position.y = -0.3;
  plaque.receiveShadow = true;
  plaque.castShadow = true;
  clavier.add(plaque);

  const touches = [];
  const geoCache = new Map();
  rangees.forEach((rangee, r) => {
    const total = rangee.reduce((s, o) => s + (o.largeur || 1), 0);
    let x = -total * U / 2;
    rangee.forEach(o => {
      const w = (o.largeur || 1) * U;
      const [fond, encre] = PALETTE[cats.indexOf(o.cat) % PALETTE.length];
      const cle = w.toFixed(2);
      if (!geoCache.has(cle)) geoCache.set(cle, new RoundedBoxGeometry(w - JEU, 0.42, U - JEU, 4, 0.1));

      const groupe = new THREE.Group();
      groupe.position.set(x + w / 2, 0.14, (r - (rangees.length - 1) / 2) * U);
      const materiau = new THREE.MeshStandardMaterial({ color: fond, roughness: 0.55, metalness: 0.05, emissive: fond, emissiveIntensity: 0 });
      const capuchon = new THREE.Mesh(geoCache.get(cle), materiau);
      capuchon.castShadow = true;
      capuchon.receiveShadow = true;
      groupe.add(capuchon);

      const texte = new THREE.Mesh(
        new THREE.PlaneGeometry(w - JEU - 0.08, U - JEU - 0.08),
        new THREE.MeshBasicMaterial({ map: etiquette(o, (w - JEU - 0.08) / (U - JEU - 0.08), encre), transparent: true, toneMapped: false })
      );
      texte.rotation.x = -Math.PI / 2;
      texte.position.y = 0.211;
      groupe.add(texte);

      capuchon.userData.touche = { outil: o, groupe, materiau, enfonce: 0, cible: 0, base: groupe.position.y };
      touches.push(capuchon.userData.touche);
      clavier.add(groupe);
      x += w;
    });
  });

  const couleurPlaque = () => {
    const clair = document.documentElement.dataset.theme === "light"
      || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: light)").matches);
    materiauPlaque.color.set(clair ? "#d9dae0" : "#14161e");
  };
  couleurPlaque();
  addEventListener("theme", couleurPlaque);

  /* Taille */
  const ajuster = () => {
    const { width, height } = zone.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // recule la caméra quand la zone est étroite pour garder le clavier entier
    const recul = Math.max(1, 1.2 / camera.aspect);
    camera.position.set(0, 8.2 * recul, 8.6 * recul);
    // sur une zone étroite, le clavier est recentré verticalement
    VISEE.z = camera.aspect < 1.4 ? 0.5 : 1.1;
    camera.lookAt(VISEE);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(ajuster).observe(zone);
  zone.appendChild(renderer.domElement);
  zone.classList.add("pret");
  ajuster();

  /* Interaction */
  const rayon = new THREE.Raycaster();
  const souris = new THREE.Vector2(9, 9);
  const penche = { x: 0, y: 0 };
  let survolee = null, choisie = null, derniereAction = 0;
  const capuchons = touches.map(t => t.groupe.children[0]);

  const afficher = t => {
    if (!info) return;
    const o = t?.outil;
    info.classList.toggle("actif", !!o);
    const logo = info.querySelector(".info-logo");
    logo.innerHTML = o?.logo ? imageLogo(o.logo, o.nom) : "";
    info.querySelector(".info-cat").textContent = o ? o.cat : "Outils et langages";
    info.querySelector(".info-nom").textContent = o ? o.nom : (tactile ? "Touchez une touche" : "Survolez une touche");
    info.querySelector(".info-desc").textContent = o ? o.desc : "Chaque touche du clavier est un outil que j'ai utilisé en projet.";
  };
  afficher(null);

  const viser = e => {
    const r = renderer.domElement.getBoundingClientRect();
    souris.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    rayon.setFromCamera(souris, camera);
    return rayon.intersectObjects(capuchons, false)[0]?.object.userData.touche || null;
  };

  addEventListener("pointermove", e => {
    penche.x = (e.clientX / innerWidth - 0.5);
    penche.y = (e.clientY / innerHeight - 0.5);
  }, { passive: true });

  renderer.domElement.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const t = viser(e);
    if (t !== survolee) {
      survolee = t;
      derniereAction = performance.now();
      renderer.domElement.style.cursor = t ? "pointer" : "";
      afficher(t || choisie);
    }
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    survolee = null;
    renderer.domElement.style.cursor = "";
    afficher(choisie);
  });
  renderer.domElement.addEventListener("pointerdown", e => {
    const t = viser(e);
    derniereAction = performance.now();
    if (!t) return;
    choisie = choisie === t ? null : t;
    t.enfonce = 1.4;
    afficher(choisie || survolee);
  });

  /* Frappe automatique quand personne n'interagit */
  let fantome = null, prochaineFrappe = 0;

  /* Boucle */
  let visible = true, enCours = false;
  const lancer = () => { if (visible && !enCours) { enCours = true; horloge.getDelta(); requestAnimationFrame(boucle); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; lancer(); }).observe(zone);

  const horloge = new THREE.Clock();
  function boucle() {
    if (!visible) { enCours = false; return; }
    const dt = Math.min(horloge.getDelta(), 0.05);
    const t = horloge.elapsedTime;
    const maintenant = performance.now();

    if (!calme && !survolee && maintenant - derniereAction > 2500 && maintenant > prochaineFrappe) {
      fantome = touches[Math.floor(Math.random() * touches.length)];
      fantome.enfonce = 1;
      prochaineFrappe = maintenant + 350 + Math.random() * 900;
    }

    for (const k of touches) {
      const active = k === survolee || k === choisie;
      k.enfonce = Math.max(0, k.enfonce - dt * 5);
      const cible = active ? 1 : Math.min(1, k.enfonce);
      k.cible += (cible - k.cible) * Math.min(1, dt * 16);
      k.groupe.position.y = k.base - k.cible * 0.16;
      k.materiau.emissiveIntensity = k.cible * (active ? 0.35 : 0.18);
    }

    const flotte = calme ? 0 : Math.sin(t * 0.8) * 0.06;
    clavier.position.y = flotte;
    const rx = calme ? 0 : penche.y * 0.12;
    const ry = calme ? -0.18 : -0.18 + penche.x * 0.25;
    clavier.rotation.x += (rx - clavier.rotation.x) * Math.min(1, dt * 3);
    clavier.rotation.y += (ry - clavier.rotation.y) * Math.min(1, dt * 3);
    clavier.rotation.z = calme ? 0.06 : 0.06 + Math.sin(t * 0.5) * 0.015;

    renderer.render(scene, camera);
    requestAnimationFrame(boucle);
  }
  lancer();
}

demarrer().catch(e => console.warn("Clavier 3D indisponible :", e));
