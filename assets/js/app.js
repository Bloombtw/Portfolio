/* Rendu du site à partir de data.js — pas besoin de modifier ce fichier. */

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const niveauDe = ac => Number(ac.split(".")[1][0]);
const compDe = ac => "C" + ac[0];
const texteAC = ac => COMPETENCES[compDe(ac)].niveaux[niveauDe(ac)].acs[ac];
const param = k => new URLSearchParams(location.search).get(k);
const page = document.body.dataset.page;
const COMPS = Object.keys(COMPETENCES);
const numComp = c => c.slice(1);
const niveauxDe = c => Object.keys(COMPETENCES[c].niveaux).map(Number);
/* « 4.2c » → « AC 3 », comme dans le référentiel */
const numAC = ac => `AC ${ac.charCodeAt(ac.length - 1) - 96}`;
const groupes = () => (typeof GROUPES !== "undefined" ? GROUPES : [{ nom: "", comps: COMPS }]);
const compsDe = p => COMPS.filter(c => Object.keys(p.liens[c] || {}).length);

/* ---------- Logos ---------- */
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
    ? `<span class="lg mono" style="--m:url('${new URL(src, document.baseURI).href}')" aria-hidden="true"></span>`
    : `<img class="lg" src="${src}" alt="" loading="lazy">`;
}
/* Outil : petit logo (s'il existe) suivi du nom */
function outil(nom) {
  const logo = logoDe(nom);
  return `<span class="outil">${logo ? imageLogo(logo, nom) : ""}${esc(nom)}</span>`;
}
function logoOrganisme(cle, classe = "") {
  const o = typeof ORGANISMES !== "undefined" && ORGANISMES[cle];
  if (!o) return "";
  return `<img class="organisme ${classe}" src="${cheminLogo(o.logo)}" alt="${esc(o.nom)}" loading="lazy">`;
}

/* AC d'une compétence : démontrés (au moins une preuve validée)
   et en attente (seulement des preuves à confirmer) */
function couverture(c, n) {
  const acs = n ? Object.keys(COMPETENCES[c].niveaux[n].acs)
    : niveauxDe(c).flatMap(k => Object.keys(COMPETENCES[c].niveaux[k].acs));
  const preuves = ac => PROJETS.map(p => (p.liens[c] || {})[ac]).filter(Boolean);
  const couverts = acs.filter(ac => preuves(ac).some(l => !l.aConfirmer)).length;
  const attente = acs.filter(ac => preuves(ac).length && preuves(ac).every(l => l.aConfirmer)).length;
  return { couverts, attente, total: acs.length };
}

/* ---------- En-tête et pied de page ---------- */
function entete() {
  const nav = [
    ["projets.html", "Projets", "projets"],
    ["competences.html", "Compétences", "competences"],
    ["apropos.html", "À propos", "apropos"]
  ].map(([href, label, id]) =>
    `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  document.getElementById("entete").innerHTML = `
    <div class="wrap barre">
      <a class="marque" href="index.html"${page === "accueil" ? ' aria-current="page"' : ""}>${esc(PROFIL.nom)}</a>
      <nav aria-label="Navigation principale">${nav}</nav>
    </div>`;
}

function liensContact() {
  const l = [];
  if (PROFIL.email) l.push(["mailto:" + PROFIL.email, PROFIL.email]);
  if (PROFIL.linkedin) l.push([PROFIL.linkedin, "LinkedIn"]);
  if (PROFIL.github) l.push([PROFIL.github, "GitHub"]);
  if (PROFIL.cv) l.push([PROFIL.cv, "CV (PDF)"]);
  return l;
}

/* Liens vers les profils, en logos cliquables */
function logosContact() {
  const liens = [
    [PROFIL.linkedin, "LinkedIn", "mono-linkedin"],
    [PROFIL.github, "GitHub", "mono-github"]
  ].filter(([u]) => u);
  return liens.map(([u, nom, logo]) =>
    `<a class="rond-logo" href="${esc(u)}" target="_blank" rel="noopener" title="${nom}" aria-label="${nom}">${imageLogo(logo, nom)}</a>`).join("");
}

/* Bloc de contact : e-mail en évidence, profils en logos */
function blocContact() {
  return `<div class="bloc-contact">
    <div>
      <p class="contact-label">Écrivez-moi</p>
      <a class="contact-mail" href="mailto:${esc(PROFIL.email)}">${imageLogo("mono-mail", "E-mail")}${esc(PROFIL.email)}</a>
      ${PROFIL.cv ? `<p class="contact-cv"><a href="${esc(PROFIL.cv)}">Télécharger mon CV (PDF)</a></p>` : ""}
    </div>
    <div>
      <p class="contact-label">Me retrouver</p>
      <div class="contact-logos">${logosContact()}</div>
    </div>
  </div>`;
}

function pied() {
  document.getElementById("pied").innerHTML = `
    <div class="wrap barre">
      <span>${esc(PROFIL.nom)} · ${esc(PROFIL.formation)}</span>
      <span class="liens">
        <a href="mailto:${esc(PROFIL.email)}">${esc(PROFIL.email)}</a>
        ${PROFIL.cv ? `<a href="${esc(PROFIL.cv)}">CV (PDF)</a>` : ""}
        ${logosContact()}
      </span>
    </div>`;
}

/* ---------- Blocs réutilisables ---------- */
function titreSection(titre, intro, lien) {
  return `<header class="tete-section">
    <h2>${titre}</h2>
    ${lien ? `<a class="lien-section" href="${lien[0]}">${lien[1]}</a>` : ""}
    ${intro ? `<p class="intro">${intro}</p>` : ""}
  </header>`;
}

function ligneProjet(p) {
  const comps = compsDe(p);
  return `<li class="projet" data-comps="${comps.join(" ")}">
    <span class="projet-date">${esc(p.periode)}</span>
    <div class="projet-corps">
      <a class="projet-titre" href="projets.html?id=${p.id}">${esc(p.nom)}</a>
      ${p.stage ? `<span class="etiquette">Stage</span>` : ""}
      ${p.aCompleter ? `<span class="etiquette discrete">Fiche à compléter</span>` : ""}
      <p>${esc(p.resume)}</p>
    </div>
    <span class="projet-comps">${comps.join(" · ")}</span>
  </li>`;
}

/* Liste des compétences, groupées, avec leur avancement */
function listeCompetences() {
  return groupes().map(g => `
    <section class="groupe">
      ${g.nom ? `<h3 class="groupe-nom">${esc(g.nom)}</h3>` : ""}
      <ul class="competences">
        ${g.comps.map(c => {
          const C = COMPETENCES[c];
          const t = couverture(c);
          return `<li>
            <a class="competence" href="competences.html?id=${c}">
              <span class="competence-code">C${numComp(c)}</span>
              <span class="competence-nom">${esc(C.nom)}</span>
              <span class="competence-avancement">
                <span class="barre-avancement" aria-hidden="true"><span style="width:${t.couverts / t.total * 100}%"></span></span>
                ${t.couverts}/${t.total} AC
              </span>
            </a>
          </li>`;
        }).join("")}
      </ul>
    </section>`).join("");
}

/* ---------- Tableau croisé ---------- */
function marqueCase(projet, c) {
  const liens = Object.entries(projet.liens[c] || {});
  if (!liens.length) return null;
  const etat = {};
  liens.forEach(([ac, l]) => {
    const n = niveauDe(ac);
    if (!l.aConfirmer) etat[n] = "valide";
    else etat[n] ??= "attente";
  });
  const niveaux = niveauxDe(c).filter(n => etat[n]);
  return {
    html: niveaux.map(n => `<span class="niv ${etat[n]}">N${n}</span>`).join(" "),
    libelle: niveaux.map(n => `niveau ${n}${etat[n] === "attente" ? " à confirmer" : ""}`).join(", ")
  };
}

function tableauCroise() {
  const ordre = groupes().flatMap(g => g.comps);
  const tete = ordre.map(c =>
    `<th scope="col"><a href="competences.html?id=${c}" title="${esc(COMPETENCES[c].nom)}">C${numComp(c)}</a></th>`).join("");
  const lignes = PROJETS.map(p => {
    const cases = ordre.map(c => {
      const x = marqueCase(p, c);
      return x
        ? `<td><a href="projets.html?id=${p.id}#${c}" aria-label="${esc(p.nom)}, compétence ${numComp(c)} : ${x.libelle}">${x.html}</a></td>`
        : `<td class="vide"></td>`;
    }).join("");
    return `<tr><th scope="row"><a href="projets.html?id=${p.id}">${esc(p.nom)}</a></th>${cases}</tr>`;
  }).join("");
  return `<div class="defile-x">
    <table class="croise">
      <caption class="sr">Projets en lignes, compétences en colonnes</caption>
      <thead><tr><th scope="col">Projet</th>${tete}</tr></thead>
      <tbody>${lignes}</tbody>
    </table>
  </div>
  <p class="legende"><span class="niv valide">N1</span> niveau démontré · <span class="niv attente">N1</span> preuve à confirmer</p>`;
}

/* ---------- Parcours (frise verticale) ---------- */
function parcours() {
  return `<ol class="parcours">${FRISE.map(e => {
    const projets = e.annee ? PROJETS.filter(p => p.annee === e.annee) : [];
    const fiche = e.projet && PROJETS.find(p => p.id === e.projet);
    return `<li>
      <span class="parcours-date">${esc(e.date)}</span>
      <div class="parcours-corps">
        <h3>${fiche ? `<a href="projets.html?id=${fiche.id}">${esc(e.titre)}</a>` : esc(e.titre)}</h3>
        <p>${esc(e.texte)}</p>
        ${projets.length ? `<p class="parcours-projets">Projets : ${projets.map(p => `<a href="projets.html?id=${p.id}">${esc(p.nom)}</a>`).join(", ")}</p>` : ""}
      </div>
      ${logoOrganisme(e.organisme, "petit")}
    </li>`;
  }).join("")}</ol>`;
}

/* ---------- Outils ---------- */
function listeOutils() {
  const cats = [...new Set(OUTILS.map(o => o.cat))];
  return `<dl class="outils">${cats.map(cat => `
    <div>
      <dt>${esc(cat)}</dt>
      <dd>${OUTILS.filter(o => o.cat === cat).map(o => `<span class="outil" title="${esc(o.desc || "")}">${o.logo ? imageLogo(o.logo, o.nom) : ""}${esc(o.nom)}</span>`).join("")}</dd>
    </div>`).join("")}</dl>`;
}

/* ---------- Page d'accueil ---------- */
function pageAccueil() {
  document.getElementById("contenu").innerHTML = `
    <section class="wrap intro-accueil">
      <div>
        <p class="sur-titre">${esc(PROFIL.formation)} · ${esc(PROFIL.parcours)}</p>
        <h1>${esc(PROFIL.nom)}</h1>
        <p class="chapeau">${esc(PROFIL.accroche)}</p>
        <p class="liens-intro">
          <a class="bouton" href="projets.html">Voir mes projets</a>
          <a href="mailto:${esc(PROFIL.email)}">${esc(PROFIL.email)}</a>
          ${logosContact()}
        </p>
      </div>
      ${PROFIL.photo ? `<img class="photo" src="${esc(PROFIL.photo)}" alt="Photo d'${esc(PROFIL.nom)}" width="180" height="180">` : ""}
    </section>

    <section class="wrap section">
      ${titreSection("Projets", "", ["projets.html", "Tous les projets"])}
      <ol class="projets">${PROJETS.slice().reverse().map(ligneProjet).join("")}</ol>
    </section>

    <section class="wrap section">
      ${titreSection("Compétences", "Les six compétences du BUT Informatique, parcours C. Le compteur indique les apprentissages critiques (AC) démontrés par au moins un projet.", ["competences.html", "Détail des compétences"])}
      ${listeCompetences()}
    </section>

    <section class="wrap section">
      ${titreSection("Parcours")}
      ${parcours()}
    </section>

    <section class="wrap section">
      ${titreSection("Outils")}
      ${listeOutils()}
    </section>

    <section class="wrap section contact">
      ${titreSection("Contact")}
      ${PROFIL.objectif ? `<p>${esc(PROFIL.objectif)}</p>` : ""}
      ${blocContact()}
    </section>`;
}

/* ---------- Page projets ---------- */
function ficheProjet(p) {
  const cs = compsDe(p);
  const comps = cs.map(c => `
    <section class="bloc-comp" id="${c}">
      <h3><a href="competences.html?id=${c}">Compétence ${numComp(c)} : ${esc(COMPETENCES[c].nom)}</a></h3>
      <ul>${Object.entries(p.liens[c]).map(([ac, l]) => `
        <li>
          <p class="ac-titre"><span class="ac-code">N${niveauDe(ac)} · ${numAC(ac)}</span> ${esc(texteAC(ac))}</p>
          <p class="preuve">${esc(l.preuve)}${l.aConfirmer ? ` <span class="a-confirmer">à confirmer</span>` : ""}</p>
        </li>`).join("")}</ul>
    </section>`).join("");

  // une image peut être un chemin ou { src, legende }
  const images = (p.images || []).map(im => typeof im === "string" ? { src: im } : im).map(im => `
    <figure class="vignette">
      <button type="button" class="agrandir" data-src="${esc(im.src)}" data-legende="${esc(im.legende || "")}" aria-label="Agrandir l'image">
        <img src="${esc(im.src)}" alt="${esc(im.legende || `Capture du projet ${p.nom}`)}" loading="lazy">
      </button>
      ${im.legende ? `<figcaption>${esc(im.legende)}</figcaption>` : ""}
    </figure>`).join("");
  const extraits = (p.code || []).map(c => `
    <figure class="extrait" data-fichier="${esc(c.fichier)}">
      <figcaption>
        <span>${esc(c.titre)} <span class="extrait-fichier">${esc(c.fichier.split("/").pop())}</span></span>
        <button type="button" class="copier">Copier</button>
      </figcaption>
      <pre><code class="language-${esc(c.langage || "plaintext")}">Chargement…</code></pre>
      <button type="button" class="deplier" hidden>Afficher tout le fichier</button>
    </figure>`).join("");
  const details = (p.details || []).map(d => `<li>${esc(d)}</li>`).join("");
  const ressources = (p.ressources || []).map(r => {
    const externe = /^https?:/.test(r.url);
    return `<li><a href="${esc(r.url)}"${externe ? ' target="_blank" rel="noopener"' : ""}>${esc(r.label)}</a></li>`;
  }).join("");
  const idx = PROJETS.indexOf(p);
  const suivant = PROJETS[(idx + 1) % PROJETS.length];
  const rubriques = [["Contexte", p.contexte], ["Objectif", p.objectif], ["Mon rôle", p.role], ["Résultats", p.resultats]];

  return `
    <article class="wrap fiche">
      <p class="fil"><a href="projets.html">Projets</a> / ${esc(p.nom)}</p>
      <header class="fiche-tete">
        <div>
          <h1>${esc(p.nom)}</h1>
          <p class="chapeau">${esc(p.resume)}</p>
          <p class="meta">${esc(p.periode)} · ${esc(p.equipe)}</p>
        </div>
        ${logoOrganisme(p.organisme)}
      </header>
      ${p.aCompleter ? `<p class="note">Cette fiche est en cours de rédaction.</p>` : ""}
      <div class="fiche-grille">
        <div class="texte">
          ${rubriques.map(([t, v]) => `<h2>${t}</h2><p>${esc(v)}</p>`).join("")}
          ${details ? `<h2>Points clés</h2><ul class="points">${details}</ul>` : ""}
        </div>
        <aside class="panneau">
          <h2>Outils</h2>
          <p class="liste-outils">${p.outils.map(outil).join("")}</p>
          ${ressources ? `<h2>Liens</h2><ul class="ressources">${ressources}</ul>` : ""}
          ${cs.length ? `<h2>Compétences</h2><p>${cs.map(c => `<a href="#${c}">C${numComp(c)}</a>`).join(", ")}</p>` : ""}
        </aside>
      </div>
      ${images ? `<h2 class="titre-bloc">Images</h2><div class="galerie">${images}</div>` : ""}
      ${extraits ? `<h2 class="titre-bloc">Code</h2><div class="extraits">${extraits}</div>` : ""}
      <h2 class="titre-bloc">Compétences mobilisées</h2>
      ${comps || "<p>Aucune compétence associée pour l'instant.</p>"}
      <p class="suivant">Projet suivant : <a href="projets.html?id=${suivant.id}">${esc(suivant.nom)}</a></p>
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
  d.innerHTML = `<button type="button" class="fermer">Fermer</button><img alt=""><p></p>`;
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
    document.title = `${p.nom} · ${PROFIL.nom}`;
    zone.innerHTML = ficheProjet(p);
    chargerExtraits(zone);
    activerVisionneuse(zone);
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
    return;
  }
  const filtres = [["", "Tous"], ...COMPS.map(c => [c, `C${numComp(c)} ${COMPETENCES[c].court}`])].map(([v, t], i) =>
    `<button type="button" data-filtre="${v}" aria-pressed="${i === 0}">${esc(t)}</button>`).join("");
  zone.innerHTML = `
    <section class="wrap page-tete">
      <h1>Projets</h1>
      <p class="chapeau">Les projets réalisés pendant le BUT, du plus récent au plus ancien.</p>
      ${id ? `<p class="note">Ce projet n'existe pas. Voici la liste complète.</p>` : ""}
      <div class="filtres" role="group" aria-label="Filtrer par compétence"><span>Filtrer :</span>${filtres}</div>
      <ol class="projets">${PROJETS.slice().reverse().map(ligneProjet).join("")}</ol>
    </section>`;
  zone.querySelectorAll("[data-filtre]").forEach(b => b.addEventListener("click", () => {
    const f = b.dataset.filtre;
    zone.querySelectorAll("[data-filtre]").forEach(x => x.setAttribute("aria-pressed", x === b));
    zone.querySelectorAll(".projet").forEach(l => {
      l.hidden = f && !l.dataset.comps.split(" ").includes(f);
    });
  }));
}

/* ---------- Page compétences ---------- */
function ficheCompetence(c) {
  const C = COMPETENCES[c];
  const tout = couverture(c);
  const niveaux = niveauxDe(c).map(n => {
    const N = C.niveaux[n];
    const { couverts, attente, total } = couverture(c, n);
    const acs = Object.entries(N.acs).map(([ac, texte]) => {
      const liens = PROJETS.filter(p => (p.liens[c] || {})[ac]);
      const valide = liens.some(p => !p.liens[c][ac].aConfirmer);
      const preuves = liens.map(p => {
        const l = p.liens[c][ac];
        return `<li><a href="projets.html?id=${p.id}#${c}">${esc(p.nom)}</a> : ${esc(l.preuve)}${l.aConfirmer ? ` <span class="a-confirmer">à confirmer</span>` : ""}</li>`;
      }).join("");
      return `<li class="${valide ? "valide" : liens.length ? "attente" : "manquant"}">
        <p class="ac-titre"><span class="ac-code">${numAC(ac)}</span> ${esc(texte)}</p>
        ${preuves ? `<ul class="preuves">${preuves}</ul>` : `<p class="vide">Pas encore de preuve.</p>`}
      </li>`;
    }).join("");
    return `<section class="niveau">
      <h2>Niveau ${n} : ${esc(N.titre)}</h2>
      <p class="compte">${couverts} AC démontrés sur ${total}${attente ? `, ${attente} à confirmer` : ""}</p>
      <ol class="acs">${acs}</ol>
    </section>`;
  }).join("");
  const groupe = groupes().find(g => g.comps.includes(c));
  return `
    <article class="wrap fiche">
      <p class="fil"><a href="competences.html">Compétences</a> / Compétence ${numComp(c)}</p>
      <header>
        <p class="sur-titre">Compétence ${numComp(c)}${groupe?.nom ? ` · ${esc(groupe.nom)}` : ""}</p>
        <h1>${esc(C.nom)}</h1>
        <p class="chapeau">${esc(C.description || "")}</p>
        <p class="meta">${tout.couverts} apprentissages critiques démontrés sur ${tout.total}${tout.attente ? `, ${tout.attente} à confirmer` : ""}.</p>
      </header>
      ${C.composantes ? `<div class="referentiel">
        <section><h2>Composantes essentielles</h2><ul>${C.composantes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
        <section><h2>Situations professionnelles</h2><ul>${C.situations.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
      </div>` : ""}
      ${niveaux}
      <p class="suivant">Autres compétences : ${COMPS.filter(x => x !== c).map(x => `<a href="competences.html?id=${x}">C${numComp(x)} ${esc(COMPETENCES[x].court)}</a>`).join(", ")}</p>
    </article>`;
}

function pageCompetences() {
  const id = param("id");
  const zone = document.getElementById("contenu");
  if (COMPETENCES[id]) {
    document.title = `Compétence ${numComp(id)} : ${COMPETENCES[id].nom} · ${PROFIL.nom}`;
    zone.innerHTML = ficheCompetence(id);
    return;
  }
  zone.innerHTML = `
    <section class="wrap page-tete">
      <h1>Compétences</h1>
      <p class="chapeau">Les six compétences du référentiel national du BUT Informatique, parcours C « Administration, gestion et exploitation des données ». C1 à C3 se valident sur deux niveaux, C4 à C6 sur trois.</p>
      ${id ? `<p class="note">Cette compétence n'existe pas. Voici la liste complète.</p>` : ""}
      ${listeCompetences()}
    </section>
    <section class="wrap section">
      ${titreSection("Projets et compétences", "Pour chaque projet, les niveaux de compétence qu'il permet de démontrer.")}
      ${tableauCroise()}
    </section>`;
}

/* ---------- Page « À propos » ---------- */
function pageAPropos() {
  if (typeof PERSO === "undefined") return;
  document.title = `À propos · ${PROFIL.nom}`;
  // phrases simples, ou « titre : texte » quand l'entrée a un titre
  const phrases = items => items.map(x => typeof x === "string"
    ? `<p class="phrase">${esc(x)}</p>`
    : `<p class="phrase"><strong>${esc(x.titre)}</strong> ${esc(x.texte)}</p>`).join("");
  const bloc = (titre, contenu) => `<section class="bloc-perso"><h2>${esc(titre)}</h2><div>${contenu}</div></section>`;
  const [debut, ...suite] = PERSO.presentation;

  document.getElementById("contenu").innerHTML = `
    <article class="wrap apropos">
      <header class="apropos-tete">
        <div>
          <p class="sur-titre">${esc(PROFIL.formation)}</p>
          <h1>${esc(PERSO.titre)}</h1>
          <p class="chapeau">${esc(debut)}</p>
        </div>
        ${PROFIL.photo ? `<img class="photo" src="${esc(PROFIL.photo)}" alt="Photo d'${esc(PROFIL.nom)}" width="200" height="200">` : ""}
      </header>

      <div class="apropos-corps">
        ${bloc("En bref", `<dl class="en-bref">${PERSO.enBref.map(([k, v]) =>
          `<dt>${esc(k)}</dt>${[].concat(v).map(x => `<dd>${esc(x)}</dd>`).join("")}`).join("")}</dl>
          ${logoOrganisme(PROFIL.ecole)}`)}
        ${suite.length ? bloc("Mon parcours", suite.map(t => `<p>${esc(t)}</p>`).join("")) : ""}
        ${bloc(PERSO.moteursTitre || "Ce qui m'intéresse", phrases(PERSO.moteurs))}
        ${bloc("Qualités", phrases(PERSO.qualites))}
        ${bloc("En dehors des études", phrases(PERSO.interets))}
        ${bloc("Contact", `${PROFIL.objectif ? `<p>${esc(PROFIL.objectif)}</p>` : ""}${blocContact()}`)}
      </div>
    </article>`;
}

/* ---------- Démarrage ---------- */
entete();
pied();
({ accueil: pageAccueil, projets: pageProjets, competences: pageCompetences, apropos: pageAPropos })[page]?.();
