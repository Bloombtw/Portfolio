/* Regénère textes-a-reecrire.txt à partir de assets/js/data.js.
   À lancer depuis la racine du projet :  node outils/extraire-textes.js  */

const fs = require("fs");
eval(fs.readFileSync("assets/js/data.js", "utf8").replace(/^const /gm, "var "));

const L = [];
let n = 0;
const titre = t => L.push("", "=".repeat(78), t, "=".repeat(78));
const sous = t => L.push("", "--- " + t + " " + "-".repeat(Math.max(3, 73 - t.length)));
const ajout = (ou, texte) => {
  if (!texte || !String(texte).trim()) return;
  n++;
  L.push("", `[${String(n).padStart(3, "0")}] ${ou}`, `    ${texte}`, "    → ");
};

L.push(
"TEXTES DU PORTFOLIO À RÉÉCRIRE",
"",
"Chaque phrase affichée sur le site est listée ci-dessous avec son emplacement.",
"Réécris-la sur la ligne « → » en dessous (laisse vide pour la garder telle quelle).",
"Tu peux ensuite me renvoyer ce fichier : je reporterai les nouvelles versions au bon endroit.",
"Si tu modifies toi-même, cherche le texte d'origine dans le fichier indiqué (Ctrl + F).",
"",
"Ne sont PAS listés : les libellés officiels du référentiel (noms des compétences,",
"niveaux, apprentissages critiques, composantes, situations), qui doivent rester",
"mot pour mot, ni les noms propres (outils, logiciels).");

titre("1. PROFIL ET ACCUEIL (assets/js/data.js › PROFIL)");
ajout("PROFIL › formation (en-tête de l'accueil, pied de page)", PROFIL.formation);
ajout("PROFIL › parcours (en-tête de l'accueil)", PROFIL.parcours);
ajout("PROFIL › accroche (texte sous ton nom, accueil)", PROFIL.accroche);
ajout("PROFIL › objectif (section Contact ; vide = pas de phrase)", PROFIL.objectif);

titre("2. PAGE « À PROPOS » (assets/js/data.js › PERSO)");
ajout("PERSO › titre", PERSO.titre);
PERSO.presentation.forEach((t, i) => ajout(`PERSO › presentation, paragraphe ${i + 1}`, t));
PERSO.enBref.forEach(([k, v]) => [].concat(v).forEach(x => ajout(`PERSO › enBref › ${k}`, x)));
ajout("PERSO › moteursTitre (titre de section)", PERSO.moteursTitre);
const phrases = (cle, nom) => PERSO[cle].forEach((x, i) => typeof x === "string"
  ? ajout(`PERSO › ${cle} (« ${nom} ») n°${i + 1}`, x)
  : ajout(`PERSO › ${cle} (« ${nom} ») › ${x.titre}`, x.texte));
phrases("moteurs", PERSO.moteursTitre || "Ce qui m'intéresse");
phrases("qualites", "Qualités");
phrases("interets", "En dehors des études");

titre("3. PARCOURS (assets/js/data.js › FRISE)");
FRISE.forEach(e => {
  ajout(`FRISE › ${e.date} › titre`, e.titre);
  ajout(`FRISE › ${e.date} › texte`, e.texte);
});

titre("4. PROJETS (assets/js/data.js › PROJETS)");
PROJETS.forEach(p => {
  sous(`${p.nom} (id: ${p.id})`);
  ajout(`${p.id} › nom`, p.nom);
  ajout(`${p.id} › resume (phrase sous le titre)`, p.resume);
  ajout(`${p.id} › equipe`, p.equipe);
  ajout(`${p.id} › contexte`, p.contexte);
  ajout(`${p.id} › objectif`, p.objectif);
  ajout(`${p.id} › role (« Mon rôle »)`, p.role);
  ajout(`${p.id} › resultats`, p.resultats);
  (p.details || []).forEach((d, i) => ajout(`${p.id} › details (« Points clés ») n°${i + 1}`, d));
  (p.images || []).forEach(im => typeof im === "object" && ajout(`${p.id} › images › légende de ${im.src.split("/").pop()}`, im.legende));
  (p.code || []).forEach(c => ajout(`${p.id} › code › titre de ${c.fichier.split("/").pop()}`, c.titre));
  (p.ressources || []).forEach(r => ajout(`${p.id} › ressources › libellé du lien`, r.label));
  Object.entries(p.liens).forEach(([c, acs]) => Object.entries(acs).forEach(([ac, l]) =>
    ajout(`${p.id} › liens › ${c} › ${ac} (preuve)`, l.preuve)));
});

titre("5. OUTILS (assets/js/data.js › OUTILS, texte affiché au survol)");
OUTILS.forEach(o => ajout(`OUTILS › ${o.nom} › desc`, o.desc));

titre("6. GROUPES DE COMPÉTENCES (assets/js/data.js › GROUPES)");
GROUPES.forEach(g => { ajout("GROUPES › nom", g.nom); ajout(`GROUPES › ${g.nom} › texte`, g.texte); });

titre("7. TEXTES DE L'INTERFACE (assets/js/app.js et fichiers .html)");
[
  ["index.html, projets.html… › <meta name=\"description\"> (résumé pour les moteurs de recherche)", "Portfolio d'Anton Meimoun, étudiant en BUT Informatique (parcours données) à l'IUT de Montreuil : projets et compétences."],
  ["app.js › pageAccueil › bouton", "Voir mes projets"],
  ["app.js › pageAccueil › lien de la section Projets", "Tous les projets"],
  ["app.js › pageAccueil › introduction de la section Compétences", "Les six compétences du BUT Informatique, parcours C. Le compteur indique les apprentissages critiques (AC) démontrés par au moins un projet."],
  ["app.js › pageAccueil › lien de la section Compétences", "Détail des compétences"],
  ["app.js › pageAccueil › titres de sections", "Projets · Compétences · Parcours · Outils · Contact"],
  ["app.js › pageProjets › phrase sous « Projets »", "Les projets réalisés pendant le BUT, du plus récent au plus ancien."],
  ["app.js › pageProjets › filtres", "Filtrer :"],
  ["app.js › ficheProjet › titres des rubriques", "Contexte · Objectif · Mon rôle · Résultats · Points clés"],
  ["app.js › ficheProjet › titres du panneau", "Outils · Liens · Compétences"],
  ["app.js › ficheProjet › titres des blocs", "Images · Code · Compétences mobilisées"],
  ["app.js › ficheProjet › fiche incomplète", "Cette fiche est en cours de rédaction."],
  ["app.js › ficheProjet › bas de page", "Projet suivant :"],
  ["app.js › ligneProjet › étiquettes", "Stage · Fiche à compléter"],
  ["app.js › pageCompetences › phrase sous « Compétences »", "Les six compétences du référentiel national du BUT Informatique, parcours C « Administration, gestion et exploitation des données ». C1 à C3 se valident sur deux niveaux, C4 à C6 sur trois."],
  ["app.js › pageCompetences › section du tableau", "Projets et compétences"],
  ["app.js › pageCompetences › introduction du tableau", "Pour chaque projet, les niveaux de compétence qu'il permet de démontrer."],
  ["app.js › tableauCroise › légende", "niveau démontré · preuve à confirmer"],
  ["app.js › ficheCompetence › compteur", "… apprentissages critiques démontrés sur …, … à confirmer."],
  ["app.js › ficheCompetence › AC sans preuve", "Pas encore de preuve."],
  ["app.js › ficheCompetence › bas de page", "Autres compétences :"],
  ["app.js › pageAPropos › titres", "Qualités · En dehors des études · Contact · En bref"],
  ["app.js › mention sur une preuve non validée", "à confirmer"]
].forEach(([ou, t]) => ajout(ou, t));

L.push("", "", `Total : ${n} textes.`, "");
// BOM UTF-8 : les accents s'affichent correctement même ouvert dans un navigateur
fs.writeFileSync("textes-a-reecrire.txt", "﻿" + L.join("\n"));
console.log(n, "textes écrits dans textes-a-reecrire.txt");
