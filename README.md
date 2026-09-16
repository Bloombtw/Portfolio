# Portfolio — Anton Meimoun

Portfolio de 3e année de BUT Informatique (parcours C, IUT de Montreuil).
Site statique en HTML, CSS et JavaScript, sans compilation. Seul le clavier 3D de l'accueil
charge [Three.js](https://threejs.org) depuis un CDN ; sans lui, une grille de touches en CSS s'affiche à la place.

Le site propose une double lecture :
- **par projets** : chaque projet et les compétences qu'il a mobilisées ;
- **par compétences** : chaque compétence (C4, C5, C6), ses apprentissages critiques par niveau et les projets qui les prouvent.

La page d'accueil présente un clavier 3D interactif (une touche par outil : survoler ou toucher
une touche affiche sa description), puis les compétences, les projets et le tableau croisé
projets × compétences. Un bouton bascule entre thème sombre et thème clair.

## Structure

```
index.html          Accueil et tableau croisé
projets.html        Liste des projets, ou fiche d'un projet (projets.html?id=...)
competences.html    Liste des compétences, ou fiche d'une compétence (competences.html?id=C4)
assets/
  css/style.css     Mise en forme
  js/data.js        TOUTES les données : profil, projets, liens avec les compétences
  js/app.js         Génération des pages (pas besoin d'y toucher)
  js/clavier.js     Clavier 3D de l'accueil (Three.js)
  img/              Captures d'écran des projets
  img/logos/        Logos des outils (clavier 3D, fiches projets)
  docs/             CV et autres PDF
.nojekyll           Indique à GitHub Pages de servir les fichiers tels quels
```

## Mettre le site en ligne sur GitHub Pages

1. Créer un dépôt public sur GitHub, par exemple `portfolio`.
   Pour une adresse du type `https://bloombtw.github.io/`, nommer le dépôt `Bloombtw.github.io`.
2. Déposer le contenu de ce dossier à la racine du dépôt :
   ```bash
   git init
   git add .
   git commit -m "Portfolio : première version"
   git branch -M main
   git remote add origin https://github.com/Bloombtw/portfolio.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings › Pages**, source **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
4. Après une ou deux minutes, le site est disponible à l'adresse `https://bloombtw.github.io/portfolio/`.

## Tester en local

Ouvrir `index.html` dans un navigateur suffit. Pour un rendu identique à GitHub Pages :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Modifier le contenu

Tout se passe dans `assets/js/data.js`.

**Profil** : compléter `objectif`, `email`, `linkedin`. Pour le CV, déposer le PDF dans `assets/docs/` et renseigner son chemin dans `cv`.

**Touches du clavier 3D** : chaque entrée de `OUTILS` devient une touche. La catégorie (`cat`) donne la couleur,
`touche` est le texte court imprimé dessus et `largeur` élargit la touche (1 par défaut) :

```js
{ cat: "Données", nom: "PostgreSQL", logo: "postgresql", largeur: 1.5, desc: "Ce que j'en ai fait." }
```

**Logos** : `logo` est le nom d'un fichier SVG de `assets/img/logos/`. Les fichiers qui commencent par
`mono-` sont des icônes d'une seule couleur, qui s'adaptent au thème. Le même logo s'affiche dans les
fiches projets dès que le nom d'un outil du projet correspond au `nom` ou à un `alias` de l'outil.
Pour un outil qui n'est pas sur le clavier, l'ajouter dans `AUTRES_LOGOS`.

Crédits : logos de [Devicon](https://devicon.dev) (licence MIT) et de [Simple Icons](https://simpleicons.org)
(CC0). Les icônes `mono-sql`, `mono-pgadmin`, `mono-mcd`, `mono-mvc`, `mono-javafx`, `mono-tests` et
`mono-algo` ont été dessinées pour ce site.

**Ajouter un projet** : copier un bloc de `PROJETS` et modifier ses champs. L'`id` sert dans l'adresse de la fiche (lettres minuscules et tirets).

**Relier un projet à une compétence** : dans `liens`, indiquer la compétence, le code de l'apprentissage critique et la preuve :

```js
liens: {
  C4: {
    "4.3b": { preuve: "Pipeline d'extraction des données de ventes vers l'entrepôt." },
    "4.3c": { preuve: "Tableau de bord Power BI", aConfirmer: true }
  }
}
```

Le niveau (N1, N2, N3) est déduit du code : `4.3b` est de niveau 3.
`aConfirmer: true` affiche la preuve en pointillés, en attendant de la valider.
Le tableau croisé, les fiches et les jauges se mettent à jour automatiquement.

**Ajouter des captures** : déposer les images dans `assets/img/` et les lister dans `images` :

```js
images: ["assets/img/mine-inventaire.png"]
```

**Ajouter des liens** (dépôt, vidéo, PDF) dans `ressources` :

```js
ressources: [{ label: "Vidéo de démonstration", url: "https://..." }]
```

## Reste à faire

- Ajouter les projets de 3e année (SAÉ, alternance ou stage) pour démontrer le niveau 3.
- Compléter la fiche de la SAE Développement web.
- Ajouter le CV, les captures (MCD, jeu) et les liens (dépôt échecs, vidéo, jeux de tests).
- Confirmer ou retirer les preuves marquées « à confirmer ».
