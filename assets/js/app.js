/* Rendu du site à partir de data.js — pas besoin de modifier ce fichier. */

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const niveauDe = ac => Number(ac.split(".")[1][0]);
const compDe = ac => "C" + ac[0];
const texteAC = ac => COMPETENCES[compDe(ac)].niveaux[niveauDe(ac)].acs[ac];
const param = k => new URLSearchParams(location.search).get(k);
const page = document.body.dataset.page;
const COMPS = Object.keys(COMPETENCES);
const deux = n => String(n).padStart(2, "0");
const compsDe = p => COMPS.filter(c => Object.keys(p.liens[c] || {}).length);
const fleche = `<svg class="fleche" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`;

/* ---------- Logos et icônes ---------- */
const ICONES_COMP = {
  C4: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
  C5: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 4v16M15 4v16M5.5 8h1.5M11.5 8h1.5M11.5 11.5h1.5M17.5 8h1"/>',
  C6: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 4.9a3.2 3.2 0 0 1 0 6.2M21 20c0-2.6-1.4-4.5-3.6-5.2"/>'
};
const icone = c => ICONES_COMP[c]
  ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONES_COMP[c]}</svg>` : "";
/* Pastille « icône + code » d'une compétence */
const puceComp = c => `<span class="puce" title="${esc(COMPETENCES[c].nom)}">${icone(c)}${c}</span>`;

/* Retrouve le logo d'un outil par son nom (ou un alias) */
function logoDe(nom) {
  const o = OUTILS.find(x => x.nom === nom || x.touche === nom || (x.alias || []).includes(nom));
  return o?.logo || AUTRES_LOGOS[nom] || null;
}
/* « java » → java.svg ; « c.png » garde son extension */
const cheminLogo = logo => `assets/img/logos/${logo}${logo.includes(".") ? "" : ".svg"}`;
const estMono = logo => logo.startsWith("mono-") && !logo.includes(".");
function imageLogo(logo, nom) {
  const src = cheminLogo(logo);
  return estMono(logo)
    // URL absolue : dans une variable CSS, un chemin relatif serait résolu depuis style.css
    ? `<span class="lg mono" style="--m:url('${new URL(src, document.baseURI).href}')" role="img" aria-label="${esc(nom)}"></span>`
    : `<img class="lg" src="${src}" alt="${esc(nom)}" loading="lazy">`;
}
/* Tuile logo avec infobulle, ou texte si l'outil n'a pas de logo */
function tuileOutil(nom) {
  const logo = logoDe(nom);
  return logo
    ? `<span class="tuile" data-nom="${esc(nom)}">${imageLogo(logo, nom)}</span>`
    : `<span class="tag">${esc(nom)}</span>`;
}

/* Logo d'un organisme sur une tuile blanche (lisible dans les deux thèmes) */
function tuileOrganisme(cle, classe = "") {
  const o = typeof ORGANISMES !== "undefined" && ORGANISMES[cle];
  if (!o) return "";
  const img = `<img src="${cheminLogo(o.logo)}" alt="${esc(o.nom)}" loading="lazy">`;
  return o.url
    ? `<a class="organisme ${classe}" href="${esc(o.url)}" title="${esc(o.nom)}" target="_blank" rel="noopener">${img}</a>`
    : `<span class="organisme ${classe}" title="${esc(o.nom)}">${img}</span>`;
}

/* Part des AC d'une compétence démontrés par au moins un projet */
function couverture(c, n) {
  const acs = n ? Object.keys(COMPETENCES[c].niveaux[n].acs)
    : [1, 2, 3].flatMap(k => Object.keys(COMPETENCES[c].niveaux[k].acs));
  const couverts = acs.filter(ac => PROJETS.some(p => (p.liens[c] || {})[ac])).length;
  return { couverts, total: acs.length };
}

/* ---------- Thème ---------- */
function themeActuel() {
  return document.documentElement.dataset.theme
    || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
}
function basculerTheme() {
  const t = themeActuel() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("theme", t); } catch (e) {}
  window.dispatchEvent(new CustomEvent("theme", { detail: t }));
}

/* ---------- En-tête et pied de page ---------- */
function entete() {
  const nav = [
    ["index.html", "Accueil", "accueil"],
    ["projets.html", "Projets", "projets"],
    ["competences.html", "Compétences", "competences"]
  ].map(([href, label, id]) =>
    `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  const el = document.getElementById("entete");
  el.innerHTML = `
    <div class="wrap barre">
      <a class="marque" href="index.html" aria-label="${esc(PROFIL.nom)}, accueil">
        <span class="logo">AM</span><span class="marque-nom">${esc(PROFIL.nom)}</span>
      </a>
      <nav aria-label="Navigation principale">${nav}</nav>
      <button class="theme" type="button" aria-label="Changer de thème">
        <svg class="soleil" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="lune" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>
      </button>
    </div>`;
  el.querySelector(".theme").addEventListener("click", basculerTheme);
  const suivre = () => el.classList.toggle("defile", scrollY > 8);
  addEventListener("scroll", suivre, { passive: true });
  suivre();
}

function liensContact() {
  const l = [];
  if (PROFIL.email) l.push(["mailto:" + PROFIL.email, "E-mail"]);
  if (PROFIL.github) l.push([PROFIL.github, "GitHub"]);
  if (PROFIL.linkedin) l.push([PROFIL.linkedin, "LinkedIn"]);
  if (PROFIL.cv) l.push([PROFIL.cv, "CV (PDF)"]);
  return l;
}

function pied() {
  document.getElementById("pied").innerHTML = `
    <div class="wrap barre">
      <span class="pied-gauche">${tuileOrganisme(PROFIL.ecole, "petit")}<span>© ${new Date().getFullYear()} ${esc(PROFIL.nom)} · ${esc(PROFIL.formation)}</span></span>
      <span class="liens">${liensContact().map(([u, t]) => `<a href="${esc(u)}">${t}</a>`).join("")}</span>
    </div>`;
}

/* ---------- Pastilles de niveau ---------- */
function pastille(n, aConfirmer, compte) {
  return `<span class="pip n${n}${aConfirmer ? " tbc" : ""}" title="Niveau ${n}${aConfirmer ? ", à confirmer" : ""}">N${n}${compte > 1 ? "×" + compte : ""}</span>`;
}

function entreeSection(num, titre, intro) {
  return `<header class="tete-section rv">
    <p class="surtitre"><span>${num}</span>${titre}</p>
    ${intro ? `<p class="intro">${intro}</p>` : ""}
  </header>`;
}

/* ---------- Tableau croisé ---------- */
/* Trois points = N1, N2, N3 : plein si démontré, creux si seulement à confirmer */
function indicateurCase(projet, c) {
  const liens = Object.entries(projet.liens[c] || {});
  if (!liens.length) return null;
  const etat = {};
  liens.forEach(([ac, l]) => {
    const n = niveauDe(ac);
    if (!l.aConfirmer) etat[n] = "on";
    else etat[n] ??= "tbc";
  });
  const points = [1, 2, 3].map(n => `<i class="pt${etat[n] ? " " + etat[n] : ""}"></i>`).join("");
  const libelle = [1, 2, 3].filter(n => etat[n])
    .map(n => `niveau ${n}${etat[n] === "tbc" ? " à confirmer" : ""}`).join(", ");
  return { html: `<span class="points" aria-hidden="true">${points}</span><span class="nb">${liens.length}</span>`, libelle };
}

function tableauCroise() {
  const tete = COMPS.map(c =>
    `<th scope="col"><a href="competences.html?id=${c}" title="${esc(COMPETENCES[c].nom)}">${icone(c)}${esc(COMPETENCES[c].court)}</a></th>`).join("");
  const lignes = PROJETS.map(p => {
    const cases = COMPS.map(c => {
      const x = indicateurCase(p, c);
      return x
        ? `<td><a class="case" href="projets.html?id=${p.id}#${c}" aria-label="${esc(p.nom)}, ${esc(COMPETENCES[c].nom)} : ${x.libelle}">${x.html}</a></td>`
        : `<td><span class="case vide" aria-label="Pas de lien">—</span></td>`;
    }).join("");
    return `<tr><th scope="row"><a href="projets.html?id=${p.id}">${esc(p.nom)}<small>${esc(p.periode)}</small></a></th>${cases}</tr>`;
  }).join("");

  const niveau3 = PROJETS.some(p => Object.values(p.liens).some(l => Object.keys(l).some(ac => niveauDe(ac) === 3)));

  return `<div class="tableau rv">
    <div class="defile-x">
      <table class="croise">
        <caption class="sr">Projets en lignes, compétences en colonnes</caption>
        <thead><tr><th scope="col"><span class="sr">Projet</span></th>${tete}</tr></thead>
        <tbody>${lignes}</tbody>
      </table>
    </div>
    <div class="legende">
      <span><span class="points"><i class="pt on"></i><i class="pt"></i><i class="pt"></i></span>N1 · N2 · N3</span>
      <span><i class="pt on"></i>démontré</span>
      <span><i class="pt tbc"></i>à confirmer</span>
      <span><span class="nb">3</span>nombre de preuves</span>
      ${niveau3 ? "" : `<p class="note">Le niveau 3 viendra avec les projets de 3e année.</p>`}
    </div>
  </div>`;
}

/* ---------- Blocs réutilisables ---------- */
function carteCompetence(c, i) {
  const C = COMPETENCES[c];
  const tout = couverture(c);
  const pct = Math.round(tout.couverts / tout.total * 100);
  const barres = [1, 2, 3].map(n => {
    const { couverts, total } = couverture(c, n);
    return `<div class="jauge"><span>N${n}</span>
      <span class="piste"><span class="rempli n${n}" style="--v:${couverts / total}"></span></span>
      <span class="mono">${couverts}/${total}</span></div>`;
  }).join("");
  return `<a class="carte comp rv" style="--d:${i}" href="competences.html?id=${c}">
    <div class="carte-haut">
      <span class="carte-ico">${icone(c)}<span class="mono">${c}</span></span>
      <span class="anneau" style="--p:${pct}"><span>${pct}%</span></span>
    </div>
    <h3>${esc(C.nom)}</h3>
    <div class="jauges">${barres}</div>
    <span class="voir">Voir les preuves ${fleche}</span>
  </a>`;
}

function ligneProjet(p, i) {
  const comps = compsDe(p);
  return `<a class="ligne rv" style="--d:${i}" href="projets.html?id=${p.id}" data-comps="${comps.join(" ")}">
    <span class="num mono">${deux(i + 1)}</span>
    <span class="ligne-corps">
      <span class="ligne-titre">${esc(p.nom)}${p.stage ? ` <span class="badge accent">stage</span>` : ""}${p.organisme && ORGANISMES[p.organisme] ? ` <img class="mini-organisme" src="${cheminLogo(ORGANISMES[p.organisme].logo)}" alt="${esc(ORGANISMES[p.organisme].nom)}">` : ""}${p.aCompleter ? ` <span class="badge">en cours</span>` : ""}</span>
      <span class="ligne-resume"><span class="mono">${esc(p.periode)}</span> · ${esc(p.resume)}</span>
    </span>
    <span class="ligne-meta">
      <span class="logos-ligne">${p.outils.filter(logoDe).slice(0, 5).map(o => imageLogo(logoDe(o), o)).join("")}</span>
      <span class="puces">${comps.map(puceComp).join("")}</span>
    </span>
    ${fleche}
  </a>`;
}

/* ---------- Frise chronologique ---------- */
function frise() {
  const jalons = FRISE.map((e, i) => `
    <button class="jalon" type="button" role="tab" id="jalon-${i}" data-i="${i}"
      aria-selected="false" aria-controls="frise-detail" tabindex="-1">
      <span class="jalon-point" aria-hidden="true"></span>
      <span class="jalon-date mono">${esc(e.date)}</span>
      <span class="jalon-type">${esc(e.type)}</span>
    </button>`).join("");
  return `<div class="frise rv" style="--n:${FRISE.length}">
    <div class="frise-piste">
      <div class="frise-jalons" role="tablist" aria-label="Étapes du parcours">
        <div class="frise-rail" aria-hidden="true"><span class="frise-progres"></span></div>
        ${jalons}
      </div>
    </div>
    <div class="frise-bas">
      <div class="frise-detail" id="frise-detail" role="tabpanel" aria-live="polite"></div>
      <div class="frise-nav">
        <button type="button" class="rond" data-pas="-1" aria-label="Étape précédente">←</button>
        <span class="mono frise-compte"></span>
        <button type="button" class="rond" data-pas="1" aria-label="Étape suivante">→</button>
      </div>
    </div>
  </div>`;
}

function detailFrise(e) {
  const projets = e.annee ? PROJETS.filter(p => p.annee === e.annee) : [];
  const lies = projets.map(p => {
    const logos = p.outils.filter(logoDe).slice(0, 3).map(o => imageLogo(logoDe(o), o)).join("");
    return `<a class="mini" href="projets.html?id=${p.id}"><span class="mini-logos">${logos}</span>${esc(p.nom)}</a>`;
  }).join("");
  const fiche = e.projet && PROJETS.find(p => p.id === e.projet);
  return `
    <div class="frise-titre">
      <div>
        <p class="frise-meta"><span class="badge accent">${esc(e.type)}</span><span class="mono">${esc(e.date)}</span></p>
        <h3>${esc(e.titre)}</h3>
      </div>
      ${tuileOrganisme(e.organisme, "grand")}
    </div>
    <p class="frise-texte">${esc(e.texte)}</p>
    ${lies ? `<div class="minis">${lies}</div>` : ""}
    ${fiche ? `<a class="btn" href="projets.html?id=${fiche.id}">Voir la fiche ${fleche}</a>` : ""}`;
}

/* Effets mo.js (chargé en asynchrone ; la frise marche sans) */
let effets = null;
function eclat(point, piste) {
  if (!window.mojs || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--accent").trim();
  const accent2 = style.getPropertyValue("--accent-2").trim();
  if (!effets) {
    const commun = { parent: piste, left: 0, top: 0, isShowStart: false };
    effets = {
      gerbe: new mojs.Burst({ ...commun, radius: { 6: 34 }, count: 10, degree: 360,
        children: { shape: "circle", radius: { 3.5: 0 }, fill: [accent, accent2], duration: 700, easing: "quad.out" } }),
      anneau: new mojs.Shape({ ...commun, shape: "circle", radius: { 4: 22 }, fill: "none",
        stroke: accent, strokeWidth: { 5: 0 }, opacity: { 1: 0 }, duration: 600, easing: "cubic.out" }),
      eclats: new mojs.Burst({ ...commun, radius: { 14: 44 }, count: 6, angle: 30,
        children: { shape: "line", radius: 5, scale: { 1: 0 }, stroke: accent2, strokeWidth: 2, duration: 550, easing: "quad.out", delay: 60 } })
    };
  }
  const r = point.getBoundingClientRect(), b = piste.getBoundingClientRect();
  const x = r.left + r.width / 2 - b.left + piste.scrollLeft;
  const y = r.top + r.height / 2 - b.top + piste.scrollTop;
  Object.values(effets).forEach(e => e.tune({ x, y }).replay());
}

function activerFrise() {
  const racine = document.querySelector(".frise");
  if (!racine) return;
  const piste = racine.querySelector(".frise-piste");
  const jalons = [...racine.querySelectorAll(".jalon")];
  const detail = racine.querySelector(".frise-detail");
  const compte = racine.querySelector(".frise-compte");
  let actuel = -1;

  const choisir = (i, { effet = true, focus = false } = {}) => {
    i = Math.max(0, Math.min(jalons.length - 1, i));
    if (i === actuel) return;
    const sens = i > actuel ? 1 : -1;
    actuel = i;
    jalons.forEach((j, k) => {
      j.setAttribute("aria-selected", k === i);
      j.tabIndex = k === i ? 0 : -1;
      j.classList.toggle("passe", k < i);
    });
    racine.style.setProperty("--p", jalons.length > 1 ? i / (jalons.length - 1) : 1);
    detail.style.setProperty("--sens", sens);
    detail.classList.remove("entre");
    void detail.offsetWidth;
    detail.innerHTML = detailFrise(FRISE[i]);
    detail.classList.add("entre");
    compte.textContent = `${deux(i + 1)} / ${deux(jalons.length)}`;
    racine.querySelector('[data-pas="-1"]').disabled = i === 0;
    racine.querySelector('[data-pas="1"]').disabled = i === jalons.length - 1;
    // défilement horizontal de la frise seulement (pas de la page)
    const j = jalons[i];
    piste.scrollTo({ left: j.offsetLeft + j.offsetWidth / 2 - piste.clientWidth / 2, behavior: effet ? "smooth" : "auto" });
    if (focus) jalons[i].focus({ preventScroll: true });
    if (effet) eclat(jalons[i].querySelector(".jalon-point"), piste);
  };

  jalons.forEach((j, i) => j.addEventListener("click", () => choisir(i)));
  racine.querySelectorAll("[data-pas]").forEach(b =>
    b.addEventListener("click", () => choisir(actuel + Number(b.dataset.pas))));
  racine.querySelector(".frise-jalons").addEventListener("keydown", e => {
    const pas = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (pas) { e.preventDefault(); choisir(actuel + pas, { focus: true }); }
    if (e.key === "Home") { e.preventDefault(); choisir(0, { focus: true }); }
    if (e.key === "End") { e.preventDefault(); choisir(jalons.length - 1, { focus: true }); }
  });

  // Au départ : première étape, puis la frise se remplit jusqu'à l'étape en cours à l'apparition
  choisir(0, { effet: false });
  const derniere = jalons.length - 1;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    setTimeout(() => choisir(derniere), 600);
  }, { threshold: 0.4 });
  io.observe(racine);
}

/* ---------- Page d'accueil ---------- */
function pageAccueil() {
  const cats = [...new Set(OUTILS.map(o => o.cat))];
  const repli = OUTILS.map(o =>
    `<span class="touche-repli" data-cat="${cats.indexOf(o.cat)}" title="${esc(o.nom)}">${o.logo ? imageLogo(o.logo, o.nom) : esc(o.touche || o.nom)}</span>`).join("");
  const contact = liensContact();
  const nbAC = PROJETS.reduce((s, p) => s + Object.values(p.liens).reduce((t, l) => t + Object.keys(l).length, 0), 0);

  document.getElementById("contenu").innerHTML = `
    <section class="hero">
      <div class="wrap hero-grille">
        <div class="hero-texte">
          <div class="statut-ligne rv">
            ${tuileOrganisme(PROFIL.ecole, "moyen")}
            <p class="statut"><span class="point"></span>${esc(PROFIL.formation)}</p>
          </div>
          <h1 class="rv" style="--d:1">${esc(PROFIL.nom.split(" ")[0])}<br><span class="degrade">${esc(PROFIL.nom.split(" ").slice(1).join(" "))}</span></h1>
          <p class="parcours rv" style="--d:2">${esc(PROFIL.parcours)}</p>
          <p class="accroche rv" style="--d:3">${esc(PROFIL.accroche)}</p>
          <div class="actions rv" style="--d:4">
            <a class="btn plein" href="#projets">Voir les projets</a>
            <a class="btn" href="competences.html">Compétences</a>
            ${PROFIL.cv ? `<a class="btn" href="${esc(PROFIL.cv)}">CV</a>` : ""}
          </div>
          <dl class="chiffres rv" style="--d:5">
            <div><dt>Projets</dt><dd>${deux(PROJETS.length)}</dd></div>
            <div><dt>Compétences</dt><dd>${deux(COMPS.length)}</dd></div>
            <div><dt>Preuves</dt><dd>${deux(nbAC)}</dd></div>
          </dl>
        </div>
        <div class="scene-zone">
          <div id="clavier" class="clavier">
            <div class="repli" data-cats='${esc(JSON.stringify(cats))}'>${repli}</div>
          </div>
          <div class="info-touche" id="info-touche" aria-live="polite">
            <span class="info-logo" aria-hidden="true"></span>
            <span class="info-cat mono">Outils et langages</span>
            <strong class="info-nom">Survolez une touche</strong>
            <span class="info-desc">Chaque touche du clavier est un outil que j'ai utilisé en projet.</span>
          </div>
        </div>
      </div>
      <a class="descendre" href="#parcours" aria-label="Descendre"><span></span></a>
    </section>

    <section class="wrap section" id="parcours">
      ${entreeSection("01", "Parcours", "De l'encadrement scolaire au stage : cliquez sur une étape, ou utilisez les flèches du clavier.")}
      ${frise()}
    </section>

    <section class="wrap section" id="competences">
      ${entreeSection("02", "Compétences", "Les trois compétences du parcours C. Chaque jauge montre la part des apprentissages critiques démontrés par au moins un projet.")}
      <div class="grille-comp">${COMPS.map(carteCompetence).join("")}</div>
    </section>

    <section class="wrap section" id="projets">
      ${entreeSection("03", "Projets", "Les projets menés pendant le BUT et les compétences qu'ils mobilisent.")}
      <div class="lignes">${PROJETS.map(ligneProjet).join("")}</div>
    </section>

    <section class="wrap section" id="croise">
      ${entreeSection("04", "Projets × compétences", "Chaque ligne est un projet, chaque colonne une compétence. Une case indique le niveau des apprentissages démontrés ; cliquez dessus pour lire la preuve.")}
      ${tableauCroise()}
    </section>

    <section class="wrap section" id="contact">
      <div class="final rv">
        <p class="surtitre"><span>05</span>Et après ?</p>
        <p class="final-texte">${esc(PROFIL.objectif)}</p>
        <div class="actions">
          ${contact.map(([u, t], i) => `<a class="btn${i ? "" : " plein"}" href="${esc(u)}">${t}</a>`).join("")}
        </div>
      </div>
    </section>`;
}

/* ---------- Page projets ---------- */
function ficheProjet(p) {
  const cs = compsDe(p);
  const comps = cs.map((c, i) => `
    <section class="bloc-comp rv" style="--d:${i}" id="${c}">
      <h3><a href="competences.html?id=${c}">${puceComp(c)}${esc(COMPETENCES[c].nom)} ${fleche}</a></h3>
      ${Object.entries(p.liens[c]).map(([ac, l]) => `
        <div class="ac">
          <p class="ac-titre">${pastille(niveauDe(ac), l.aConfirmer)}<span><span class="mono">${ac}</span> ${esc(texteAC(ac))}</span></p>
          <p class="preuve">${esc(l.preuve)}${l.aConfirmer ? " <em>à confirmer</em>" : ""}</p>
        </div>`).join("")}
    </section>`).join("");

  // une image peut être un chemin ou { src, legende }
  const images = (p.images || []).map(im => typeof im === "string" ? { src: im } : im).map((im, i) => `
    <figure class="vignette rv" style="--d:${i}">
      <button type="button" class="agrandir" data-src="${esc(im.src)}" data-legende="${esc(im.legende || "")}" aria-label="Agrandir l'image">
        <img src="${esc(im.src)}" alt="${esc(im.legende || `Capture du projet ${p.nom}`)}" loading="lazy">
      </button>
      ${im.legende ? `<figcaption>${esc(im.legende)}</figcaption>` : ""}
    </figure>`).join("");
  const extraits = (p.code || []).map((c, i) => `
    <figure class="extrait rv" style="--d:${i}" data-fichier="${esc(c.fichier)}" data-langage="${esc(c.langage || "")}">
      <figcaption>
        <span class="extrait-points" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="extrait-titre">${esc(c.titre)}</span>
        <span class="mono extrait-fichier">${esc(c.fichier.split("/").pop())}</span>
        <button type="button" class="copier">Copier</button>
      </figcaption>
      <pre><code class="language-${esc(c.langage || "plaintext")}">Chargement…</code></pre>
      <button type="button" class="deplier" hidden>Afficher tout le fichier</button>
    </figure>`).join("");
  const details = (p.details || []).map(d => `<li>${esc(d)}</li>`).join("");
  const ressources = (p.ressources || []).map(r => {
    const externe = /^https?:/.test(r.url);
    return `<a class="btn" href="${esc(r.url)}"${externe ? ' target="_blank" rel="noopener"' : ""}>${esc(r.label)} ${fleche}</a>`;
  }).join("");
  const idx = PROJETS.indexOf(p);
  const suivant = PROJETS[(idx + 1) % PROJETS.length];
  const rubriques = [["Contexte", p.contexte], ["Objectif", p.objectif], ["Mon rôle", p.role], ["Résultats", p.resultats]];

  return `
    <article class="wrap fiche">
      <a class="retour rv" href="projets.html">← Tous les projets</a>
      <header class="fiche-tete">
        <p class="surtitre rv"><span>${deux(idx + 1)}</span>${p.stage ? "Stage" : "Projet"}</p>
        <div class="fiche-titre rv" style="--d:1">
          <h1>${esc(p.nom)}</h1>
          ${tuileOrganisme(p.organisme, "grand")}
        </div>
        <p class="fiche-resume rv" style="--d:2">${esc(p.resume)}</p>
        <dl class="meta rv" style="--d:3">
          <div><dt>Période</dt><dd>${esc(p.periode)}</dd></div>
          <div><dt>Équipe</dt><dd>${esc(p.equipe)}</dd></div>
          <div><dt>Compétences</dt><dd class="puces">${cs.map(c => `<a href="#${c}">${puceComp(c)}</a>`).join("") || "—"}</dd></div>
        </dl>
        ${p.aCompleter ? `<p class="alerte rv">Fiche en cours de rédaction.</p>` : ""}
      </header>
      <div class="fiche-grille">
        <div class="rubriques">
          ${rubriques.map(([t, v]) => `<section class="rubrique rv"><h2>${t}</h2><p>${esc(v)}</p></section>`).join("")}
        </div>
        <aside class="panneau rv">
          <h2>Outils</h2>
          <div class="tuiles">${p.outils.map(tuileOutil).join("")}</div>
          ${ressources ? `<h2>Ressources</h2><div class="pile">${ressources}</div>` : ""}
        </aside>
      </div>
      ${details ? `<h2 class="titre-bloc rv">Points clés</h2><ul class="points-cles rv">${details}</ul>` : ""}
      ${images ? `<h2 class="titre-bloc rv">En images</h2><div class="galerie">${images}</div>` : ""}
      ${extraits ? `<h2 class="titre-bloc rv">Dans le code</h2><div class="extraits">${extraits}</div>` : ""}
      <h2 class="titre-bloc rv">Compétences mobilisées</h2>
      ${comps || "<p>Aucune compétence associée pour l'instant.</p>"}
      <a class="suivant rv" href="projets.html?id=${suivant.id}">
        <span class="mono">Projet suivant</span>
        <strong>${esc(suivant.nom)} ${fleche}</strong>
      </a>
    </article>`;
}

/* Extraits de code : chargés depuis assets/code/, colorés par highlight.js s'il est là */
const LIGNES_REPLIEES = 40;
function chargerExtraits(zone) {
  zone.querySelectorAll(".extrait").forEach(async fig => {
    const code = fig.querySelector("code");
    try {
      const rep = await fetch(fig.dataset.fichier);
      if (!rep.ok) throw new Error(rep.status);
      code.textContent = (await rep.text()).replace(/\s+$/, "");
    } catch (e) {
      code.textContent = "Impossible de charger ce fichier (ouvrir le site via un serveur, voir le README).";
      return;
    }
    const colorer = () => window.hljs?.highlightElement(code);
    window.hljs ? colorer() : document.getElementById("script-hljs")?.addEventListener("load", colorer, { once: true });

    const nb = code.textContent.split("\n").length;
    const bouton = fig.querySelector(".deplier");
    if (nb > LIGNES_REPLIEES) {
      fig.classList.add("replie");
      bouton.hidden = false;
      bouton.textContent = `Afficher les ${nb} lignes`;
      bouton.addEventListener("click", () => {
        const replie = fig.classList.toggle("replie");
        bouton.textContent = replie ? `Afficher les ${nb} lignes` : "Replier";
      });
    }
    fig.querySelector(".copier").addEventListener("click", async e => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        e.target.textContent = "Copié";
      } catch (err) {
        e.target.textContent = "Échec";
      }
      setTimeout(() => { e.target.textContent = "Copier"; }, 1500);
    });
  });
}

/* Visionneuse : clic sur une image pour l'agrandir */
function activerVisionneuse(zone) {
  const boutons = zone.querySelectorAll(".agrandir");
  if (!boutons.length) return;
  const d = document.createElement("dialog");
  d.className = "visionneuse";
  d.innerHTML = `<button type="button" class="rond fermer" aria-label="Fermer">✕</button><img alt=""><p></p>`;
  document.body.append(d);
  const fermer = () => d.close();
  d.querySelector(".fermer").addEventListener("click", fermer);
  d.addEventListener("click", e => { if (e.target === d) fermer(); });
  d.addEventListener("keydown", e => { if (e.key === "Escape") { e.preventDefault(); fermer(); } });
  boutons.forEach(b => b.addEventListener("click", () => {
    d.querySelector("img").src = b.dataset.src;
    d.querySelector("img").alt = b.dataset.legende;
    d.querySelector("p").textContent = b.dataset.legende;
    d.showModal();
  }));
}

function pageProjets() {
  const id = param("id");
  const p = PROJETS.find(x => x.id === id);
  const zone = document.getElementById("contenu");
  if (p) {
    document.title = `${p.nom} | ${PROFIL.nom}`;
    zone.innerHTML = ficheProjet(p);
    chargerExtraits(zone);
    activerVisionneuse(zone);
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
    return;
  }
  const filtres = ["Tous", ...COMPS].map((c, i) =>
    `<button type="button" data-filtre="${i ? c : ""}" aria-pressed="${i === 0}">${i ? `${icone(c)}${esc(COMPETENCES[c].court)}` : c}</button>`).join("");
  zone.innerHTML = `
    <section class="wrap page-tete">
      <p class="surtitre rv"><span>${deux(PROJETS.length)}</span>Projets</p>
      <h1 class="rv" style="--d:1">Ce que j'ai construit</h1>
      <p class="intro rv" style="--d:2">Les projets menés pendant le BUT et les compétences qu'ils ont mobilisées.</p>
      ${id ? `<p class="alerte">Ce projet n'existe pas. Voici la liste complète.</p>` : ""}
      <div class="filtres rv" style="--d:3" role="group" aria-label="Filtrer par compétence">${filtres}</div>
      <div class="lignes">${PROJETS.map(ligneProjet).join("")}</div>
    </section>`;
  zone.querySelectorAll("[data-filtre]").forEach(b => b.addEventListener("click", () => {
    const f = b.dataset.filtre;
    zone.querySelectorAll("[data-filtre]").forEach(x => x.setAttribute("aria-pressed", x === b));
    zone.querySelectorAll(".ligne").forEach(l => {
      l.hidden = f && !l.dataset.comps.split(" ").includes(f);
    });
  }));
}

/* ---------- Page compétences ---------- */
function ficheCompetence(c) {
  const C = COMPETENCES[c];
  const tout = couverture(c);
  const niveaux = [1, 2, 3].map(n => {
    const N = C.niveaux[n];
    const { couverts, total } = couverture(c, n);
    const acs = Object.entries(N.acs).map(([ac, texte]) => {
      const preuves = PROJETS.filter(p => (p.liens[c] || {})[ac]).map(p => {
        const l = p.liens[c][ac];
        return `<li><a href="projets.html?id=${p.id}#${c}">${esc(p.nom)}</a><span>${esc(l.preuve)}${l.aConfirmer ? " <em>à confirmer</em>" : ""}</span></li>`;
      }).join("");
      return `<div class="ac${preuves ? " fait" : ""}">
        <p class="ac-titre"><span class="coche" aria-hidden="true"></span><span><span class="mono">${ac}</span> ${esc(texte)}</span></p>
        ${preuves ? `<ul class="preuves">${preuves}</ul>` : `<p class="vide">Pas encore de preuve</p>`}
      </div>`;
    }).join("");
    return `<section class="niveau n${n} rv">
      <div class="niveau-tete">
        ${pastille(n)}
        <h2>${esc(N.titre)}</h2>
        <span class="mono compte">${couverts}/${total}</span>
      </div>
      ${acs}
    </section>`;
  }).join("");
  return `
    <article class="wrap fiche">
      <a class="retour rv" href="competences.html">← Toutes les compétences</a>
      <header class="fiche-tete">
        <p class="surtitre rv"><span class="avec-ico">${icone(c)}${c}</span>${esc(C.court)}</p>
        <h1 class="rv" style="--d:1">${esc(C.nom)}</h1>
        <p class="fiche-resume rv" style="--d:2">${tout.couverts} apprentissages critiques démontrés sur ${tout.total}, et les projets qui les prouvent.</p>
      </header>
      <div class="niveaux">${niveaux}</div>
    </article>`;
}

function pageCompetences() {
  const id = param("id");
  const zone = document.getElementById("contenu");
  if (COMPETENCES[id]) {
    document.title = `${id} ${COMPETENCES[id].nom} | ${PROFIL.nom}`;
    zone.innerHTML = ficheCompetence(id);
    return;
  }
  zone.innerHTML = `
    <section class="wrap page-tete">
      <p class="surtitre rv"><span>${deux(COMPS.length)}</span>Compétences</p>
      <h1 class="rv" style="--d:1">Parcours C, en preuves</h1>
      <p class="intro rv" style="--d:2">Les trois compétences du parcours C. Les jauges montrent la part des apprentissages critiques démontrés par au moins un projet.</p>
      ${id ? `<p class="alerte">Cette compétence n'existe pas. Voici la liste complète.</p>` : ""}
      <div class="grille-comp">${COMPS.map(carteCompetence).join("")}</div>
    </section>
    <section class="wrap section">
      ${entreeSection("↳", "Projets × compétences")}
      ${tableauCroise()}
    </section>`;
}

/* ---------- Apparitions au défilement ---------- */
function apparitions() {
  const els = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("vu"));
  const io = new IntersectionObserver(entrees => entrees.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

/* Reflet qui suit la souris sur les cartes */
function reflets() {
  document.addEventListener("pointermove", e => {
    const c = e.target.closest?.(".carte");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* ---------- Fond étoilé ---------- */
function etoiles() {
  const cv = document.getElementById("etoiles");
  const ctx = cv?.getContext("2d");
  if (!ctx) return;
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pts = [], w, h, couleur, px = 0, py = 0;
  const lireCouleur = () => { couleur = getComputedStyle(document.documentElement).getPropertyValue("--etoile").trim() || "255,255,255"; };
  const taille = () => {
    const r = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * r; cv.height = h * r;
    ctx.setTransform(r, 0, 0, r, 0, 0);
    const n = Math.round(Math.min(220, w * h / 7000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      z: Math.random() * .8 + .2, t: Math.random() * 6.28
    }));
  };
  addEventListener("pointermove", e => { px = e.clientX / w - .5; py = e.clientY / h - .5; }, { passive: true });
  const dessin = temps => {
    ctx.clearRect(0, 0, w, h);
    const sy = scrollY * .04;
    for (const p of pts) {
      if (!calme) { p.y -= p.z * .08; if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; } }
      const a = (.25 + .55 * p.z) * (calme ? 1 : .65 + .35 * Math.sin(temps / 900 + p.t));
      const x = (p.x - px * 18 * p.z + w) % w;
      const y = ((p.y - py * 18 * p.z - sy * p.z) % h + h) % h;
      ctx.fillStyle = `rgba(${couleur},${a})`;
      ctx.beginPath(); ctx.arc(x, y, p.z * 1.1, 0, 6.29); ctx.fill();
    }
    if (!calme) requestAnimationFrame(dessin);
  };
  lireCouleur(); taille();
  addEventListener("resize", () => { taille(); if (calme) dessin(0); });
  addEventListener("theme", () => { lireCouleur(); if (calme) dessin(0); });
  requestAnimationFrame(dessin);
}

/* ---------- Démarrage ---------- */
entete();
pied();
({ accueil: pageAccueil, projets: pageProjets, competences: pageCompetences })[page]?.();
activerFrise();
apparitions();
reflets();
etoiles();
