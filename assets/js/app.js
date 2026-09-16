/* Rendu du site à partir de data.js — pas besoin de modifier ce fichier. */

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const niveauDe = ac => Number(ac.split(".")[1][0]);
const compDe = ac => "C" + ac[0];
const texteAC = ac => COMPETENCES[compDe(ac)].niveaux[niveauDe(ac)].acs[ac];
const param = k => new URLSearchParams(location.search).get(k);
const page = document.body.dataset.page;

/* ---------- En-tête et pied de page ---------- */
function entete() {
  const nav = [
    ["index.html", "Accueil", "accueil"],
    ["projets.html", "Projets", "projets"],
    ["competences.html", "Compétences", "competences"]
  ].map(([href, label, id]) =>
    `<a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  document.getElementById("entete").innerHTML = `
    <div class="wrap bar">
      <a class="marque" href="index.html"><strong>${esc(PROFIL.nom)}</strong><span>${esc(PROFIL.formation)}</span></a>
      <nav aria-label="Navigation principale">${nav}</nav>
    </div>`;
}

function pied() {
  const liens = [];
  if (PROFIL.email) liens.push(`<a href="mailto:${esc(PROFIL.email)}">${esc(PROFIL.email)}</a>`);
  if (PROFIL.github) liens.push(`<a href="${esc(PROFIL.github)}">GitHub</a>`);
  if (PROFIL.linkedin) liens.push(`<a href="${esc(PROFIL.linkedin)}">LinkedIn</a>`);
  if (PROFIL.cv) liens.push(`<a href="${esc(PROFIL.cv)}">CV (PDF)</a>`);
  document.getElementById("pied").innerHTML = `
    <div class="wrap bar">
      <span>${esc(PROFIL.nom)}, portfolio de 3e année</span>
      <span class="liens">${liens.join("")}</span>
    </div>`;
}

/* ---------- Pastilles de niveau ---------- */
function pastille(n, aConfirmer, compte) {
  return `<span class="pip n${n}${aConfirmer ? " tbc" : ""}" title="Niveau ${n}${aConfirmer ? ", à confirmer" : ""}">N${n}${compte > 1 ? " ×" + compte : ""}</span>`;
}

function pastillesCase(projet, c) {
  const liens = projet.liens[c] || {};
  const parNiveau = {};
  Object.entries(liens).forEach(([ac, l]) => {
    const n = niveauDe(ac);
    parNiveau[n] ??= { compte: 0, tousAConfirmer: true };
    parNiveau[n].compte++;
    if (!l.aConfirmer) parNiveau[n].tousAConfirmer = false;
  });
  return Object.keys(parNiveau).sort()
    .map(n => pastille(n, parNiveau[n].tousAConfirmer, parNiveau[n].compte)).join("");
}

function legende() {
  return `<div class="legende">
    <span>${pastille(1)} niveau 1</span>
    <span>${pastille(2)} niveau 2</span>
    <span>${pastille(3)} niveau 3</span>
    <span><span class="pip n1 tbc">N</span>&nbsp; preuve à confirmer</span>
  </div>`;
}

/* ---------- Tableau croisé ---------- */
function tableauCroise() {
  const cs = Object.keys(COMPETENCES);
  const tete = cs.map(c =>
    `<th scope="col"><a href="competences.html?id=${c}">${c} ${esc(COMPETENCES[c].court)}<small>${esc(COMPETENCES[c].nom)}</small></a></th>`).join("");
  const lignes = PROJETS.map(p => {
    const cases = cs.map(c => {
      const x = pastillesCase(p, c);
      return x
        ? `<td><a class="case on" href="projets.html?id=${p.id}#${c}" aria-label="${esc(p.nom)} et ${esc(COMPETENCES[c].nom)}">${x}</a></td>`
        : `<td><span class="case" aria-label="Pas de lien">—</span></td>`;
    }).join("");
    return `<tr><th scope="row"><a href="projets.html?id=${p.id}">${esc(p.nom)}<small>${esc(p.periode)}</small></a></th>${cases}</tr>`;
  }).join("");

  const niveau3 = PROJETS.some(p => Object.keys(p.liens).some(c => Object.keys(p.liens[c]).some(ac => niveauDe(ac) === 3)));
  const manque = niveau3 ? "" :
    `<tr class="manque"><td colspan="${cs.length + 1}">Niveau 3 : les projets de 3e année viendront compléter ce tableau.</td></tr>`;

  return `<div class="tableau">
    <table class="croise">
      <caption class="sr">Projets en lignes, compétences en colonnes</caption>
      <thead><tr><th scope="col"><span class="sr">Projet</span></th>${tete}</tr></thead>
      <tbody>${lignes}${manque}</tbody>
    </table>
    ${legende()}
  </div>`;
}

/* ---------- Page d'accueil ---------- */
function pageAccueil() {
  const outils = Object.entries(PROFIL.outils).map(([cat, items]) =>
    `<div><h3>${esc(cat)}</h3><div class="tags">${items.map(i => `<span class="tag">${esc(i)}</span>`).join("")}</div></div>`).join("");
  document.getElementById("contenu").innerHTML = `
    <section class="hero wrap">
      <p class="parcours">${esc(PROFIL.parcours)}</p>
      <h1>${esc(PROFIL.nom)}</h1>
      <p class="accroche">${esc(PROFIL.accroche)}</p>
      <div class="actions">
        <a class="btn plein" href="projets.html">Voir les projets</a>
        <a class="btn" href="competences.html">Voir les compétences</a>
        ${PROFIL.cv ? `<a class="btn" href="${esc(PROFIL.cv)}">Télécharger le CV</a>` : ""}
      </div>
    </section>

    <section class="wrap bloc">
      <h2>Projets et compétences</h2>
      <p class="intro">Chaque ligne est un projet, chaque colonne une compétence du parcours C. Une case indique le niveau des apprentissages démontrés ; cliquez dessus pour lire la preuve.</p>
      ${tableauCroise()}
    </section>

    <section class="wrap bloc deux">
      <div>
        <h2>Objectif</h2>
        <p>${esc(PROFIL.objectif)}</p>
      </div>
      <div class="outils">
        <h2>Outils et langages</h2>
        ${outils}
      </div>
    </section>`;
}

/* ---------- Page projets ---------- */
function carteProjet(p) {
  const comps = Object.keys(p.liens).filter(c => Object.keys(p.liens[c]).length);
  return `<a class="carte" href="projets.html?id=${p.id}">
    <span class="periode">${esc(p.periode)}, ${esc(p.equipe.toLowerCase())}</span>
    <h3>${esc(p.nom)}</h3>
    <p>${esc(p.resume)}</p>
    <span class="tags">${comps.map(c => `<span class="tag">${c} ${esc(COMPETENCES[c].court)}</span>`).join("")}</span>
  </a>`;
}

function ficheProjet(p) {
  const cs = Object.keys(COMPETENCES).filter(c => Object.keys(p.liens[c] || {}).length);
  const comps = cs.map(c => `
    <section class="lien-comp" id="${c}">
      <h3><a href="competences.html?id=${c}">${c} · ${esc(COMPETENCES[c].nom)}</a></h3>
      ${Object.entries(p.liens[c]).map(([ac, l]) => `
        <div class="ac">
          <p class="ac-titre">${pastille(niveauDe(ac), l.aConfirmer)} <span>${ac} ${esc(texteAC(ac))}</span></p>
          <p class="preuve">${esc(l.preuve)}${l.aConfirmer ? " <em>(à confirmer)</em>" : ""}</p>
        </div>`).join("")}
    </section>`).join("");

  const images = (p.images || []).map(src => `<img src="${esc(src)}" alt="Capture du projet ${esc(p.nom)}" loading="lazy">`).join("");
  const ressources = (p.ressources || []).map(r => `<a class="btn" href="${esc(r.url)}">${esc(r.label)}</a>`).join("");

  return `
    <article class="wrap fiche">
      <p class="retour"><a href="projets.html">Tous les projets</a></p>
      <h1>${esc(p.nom)}</h1>
      <p class="periode">${esc(p.periode)}, ${esc(p.equipe.toLowerCase())}</p>
      ${p.aCompleter ? `<p class="alerte">Fiche en cours de rédaction.</p>` : ""}
      <div class="deux">
        <div>
          <h2>Contexte</h2><p>${esc(p.contexte)}</p>
          <h2>Objectif</h2><p>${esc(p.objectif)}</p>
          <h2>Mon rôle</h2><p>${esc(p.role)}</p>
          <h2>Résultats</h2><p>${esc(p.resultats)}</p>
        </div>
        <aside>
          <h2>Outils</h2>
          <div class="tags">${p.outils.map(o => `<span class="tag">${esc(o)}</span>`).join("")}</div>
          ${ressources ? `<h2>Ressources</h2><div class="actions">${ressources}</div>` : ""}
        </aside>
      </div>
      ${images ? `<div class="galerie">${images}</div>` : ""}
      <h2 class="sep">Compétences mobilisées</h2>
      ${comps || "<p>Aucune compétence associée pour l'instant.</p>"}
    </article>`;
}

function pageProjets() {
  const id = param("id");
  const p = PROJETS.find(x => x.id === id);
  const zone = document.getElementById("contenu");
  if (p) {
    document.title = `${p.nom} | ${PROFIL.nom}`;
    zone.innerHTML = ficheProjet(p);
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
    return;
  }
  zone.innerHTML = `
    <section class="wrap bloc">
      <h1>Projets</h1>
      <p class="intro">Les projets menés pendant le BUT et les compétences qu'ils ont mobilisées.</p>
      ${id ? `<p class="alerte">Ce projet n'existe pas. Voici la liste complète.</p>` : ""}
      <div class="grille">${PROJETS.map(carteProjet).join("")}</div>
    </section>`;
}

/* ---------- Page compétences ---------- */
function ficheCompetence(c) {
  const C = COMPETENCES[c];
  const niveaux = [1, 2, 3].map(n => {
    const N = C.niveaux[n];
    const acs = Object.entries(N.acs).map(([ac, texte]) => {
      const preuves = PROJETS.filter(p => (p.liens[c] || {})[ac]).map(p => {
        const l = p.liens[c][ac];
        return `<li><a href="projets.html?id=${p.id}#${c}">${esc(p.nom)}</a> : ${esc(l.preuve)}${l.aConfirmer ? " <em>(à confirmer)</em>" : ""}</li>`;
      }).join("");
      return `<div class="ac">
        <p class="ac-titre"><span>${ac} ${esc(texte)}</span></p>
        ${preuves ? `<ul class="preuves">${preuves}</ul>` : `<p class="vide">Pas encore de preuve.</p>`}
      </div>`;
    }).join("");
    return `<section class="niveau n${n}">
      <h2>${pastille(n)} ${esc(N.titre)}</h2>
      ${acs}
    </section>`;
  }).join("");
  return `
    <article class="wrap fiche">
      <p class="retour"><a href="competences.html">Toutes les compétences</a></p>
      <h1>${c} · ${esc(C.nom)}</h1>
      <p class="intro">Les apprentissages critiques de chaque niveau et les projets qui les démontrent.</p>
      ${niveaux}
    </article>`;
}

function carteCompetence(c) {
  const C = COMPETENCES[c];
  const barres = [1, 2, 3].map(n => {
    const total = Object.keys(C.niveaux[n].acs).length;
    const couverts = Object.keys(C.niveaux[n].acs).filter(ac => PROJETS.some(p => (p.liens[c] || {})[ac])).length;
    return `<div class="jauge"><span>Niveau ${n}</span>
      <span class="piste"><span class="rempli n${n}" style="width:${Math.round(couverts / total * 100)}%"></span></span>
      <span>${couverts}/${total}</span></div>`;
  }).join("");
  return `<a class="carte" href="competences.html?id=${c}">
    <span class="periode">${c}</span>
    <h3>${esc(C.nom)}</h3>
    ${barres}
  </a>`;
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
    <section class="wrap bloc">
      <h1>Compétences</h1>
      <p class="intro">Les trois compétences du parcours C. Les jauges montrent la part des apprentissages critiques démontrés par au moins un projet.</p>
      ${id ? `<p class="alerte">Cette compétence n'existe pas. Voici la liste complète.</p>` : ""}
      <div class="grille">${Object.keys(COMPETENCES).map(carteCompetence).join("")}</div>
    </section>`;
}

/* ---------- Démarrage ---------- */
entete();
pied();
({ accueil: pageAccueil, projets: pageProjets, competences: pageCompetences })[page]?.();
