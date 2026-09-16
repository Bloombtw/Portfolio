/* =========================================================
   DONNÉES DU PORTFOLIO — c'est le seul fichier à modifier
   pour ajouter un projet ou une preuve.
   ========================================================= */

const PROFIL = {
  nom: "Anton Meimoun",
  formation: "BUT Informatique, IUT de Montreuil",
  parcours: "Parcours C : administration, gestion et exploitation des données",
  accroche: "Étudiant en 3e année, je conçois des bases de données et des applications qui les exploitent, et je travaille en équipe sur des projets menés de bout en bout.",
  objectif: "À compléter : poste ou poursuite d'études visée après le BUT.",
  // Déposer le CV dans assets/docs/ puis garder ce chemin
  cv: "",               // ex. "assets/docs/CV_Anton_Meimoun.pdf" une fois le PDF déposé
  github: "https://github.com/Bloombtw",
  linkedin: "",          // ex. "https://www.linkedin.com/in/..."
  email: ""              // ex. "anton.meimoun@example.com"
};

/* OUTILS : chaque entrée devient une touche du clavier 3D de l'accueil.
   touche : texte court imprimé sur la touche (facultatif, sinon nom)
   largeur : largeur de la touche (1 par défaut)
   Les touches sont posées dans l'ordre de la liste et passent à la rangée
   suivante quand la rangée est pleine. La catégorie donne la couleur. */
const OUTILS = [
  { cat: "Langages", nom: "Java", desc: "Langage principal de MineTaRouille (JavaFX, MVC) et du moteur de la SAE Jeu d'échecs." },
  { cat: "Langages", nom: "Python", desc: "Scripts et exercices d'algorithmique." },
  { cat: "Langages", nom: "C", desc: "Programmation bas niveau : mémoire, pointeurs, structures." },
  { cat: "Langages", nom: "SQL", desc: "Création de bases, contraintes d'intégrité et requêtes d'interrogation." },
  { cat: "Langages", nom: "HTML / CSS", touche: "HTML", desc: "Pages web, dont ce portfolio." },
  { cat: "Données", nom: "PostgreSQL", touche: "Postgres", largeur: 1.5, desc: "SGBD de la SAE Base de données : création de la base et requêtes." },
  { cat: "Données", nom: "pgAdmin", desc: "Administration et interrogation des bases PostgreSQL." },
  { cat: "Conception", nom: "Modélisation MCD / MLD", touche: "MCD", desc: "Modèle conceptuel de 8 entités construit à partir d'un cahier des charges." },
  { cat: "Conception", nom: "JavaFX", desc: "Interface graphique de MineTaRouille : rendu du monde et inventaire." },
  { cat: "Conception", nom: "Architecture MVC", touche: "MVC", desc: "Séparation modèle, vue et contrôleur dans MineTaRouille." },
  { cat: "Outils", nom: "Git / GitHub", touche: "Git", desc: "Dépôts partagés et branches pour organiser le travail en équipe." },
  { cat: "Outils", nom: "Trello", desc: "Suivi des tâches de MineTaRouille." },
  { cat: "Outils", nom: "IntelliJ", desc: "IDE pour les projets Java." },
  { cat: "Outils", nom: "VS Code", desc: "Éditeur pour le web et les scripts." },
  { cat: "Outils", nom: "Suite Office", touche: "Office", desc: "Rapports, présentations et documents de projet." },
  { cat: "Systèmes", nom: "Linux", desc: "Environnement de travail quotidien à l'IUT." },
  { cat: "Systèmes", nom: "Windows", desc: "Poste personnel et outils bureautiques." },
  { cat: "Systèmes", nom: "VirtualBox", largeur: 2, desc: "Machines virtuelles pour tester des systèmes et des services." }
];

/* Compétences du parcours C (numérotation nationale C4, C5, C6).
   Chaque niveau liste ses apprentissages critiques (AC). */
const COMPETENCES = {
  C4: { nom: "Gérer des données de l'information", court: "Données", niveaux: {
    1: { titre: "Concevoir et mettre en place une base de données à partir d'un cahier des charges client", acs: {
      "4.1a": "Mettre à jour et interroger une base de données relationnelle",
      "4.1b": "Visualiser des données",
      "4.1c": "Concevoir une base de données relationnelle à partir d'un cahier des charges" } },
    2: { titre: "Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité", acs: {
      "4.2a": "Optimiser les modèles de données de l'entreprise",
      "4.2b": "Assurer la confidentialité, l'intégrité et la sécurité des données",
      "4.2c": "Organiser la restitution des données par la programmation et la visualisation",
      "4.2d": "Manipuler des données hétérogènes" } },
    3: { titre: "Administrer une base de données, concevoir et réaliser des systèmes d'informations décisionnels", acs: {
      "4.3a": "Capturer et stocker des ensembles volumineux et complexes de données hétérogènes",
      "4.3b": "Préparer et extraire les données pour l'exploitation",
      "4.3c": "Appliquer des méthodes d'exploration et d'exploitation des données",
      "4.3d": "Mettre en production et optimiser le système de gestion de données de l'entreprise" } } } },
  C5: { nom: "Conduire un projet", court: "Projet", niveaux: {
    1: { titre: "Identifier les besoins métiers des clients et des utilisateurs", acs: {
      "5.1a": "Appréhender les besoins du client et de l'utilisateur",
      "5.1b": "Mettre en place les outils de gestion de projet",
      "5.1c": "Identifier les acteurs et les différentes phases d'un cycle de développement" } },
    2: { titre: "Appliquer une démarche de suivi de projet selon les besoins métiers", acs: {
      "5.2a": "Identifier les processus d'une organisation pour améliorer les systèmes d'information",
      "5.2b": "Formaliser les besoins du client et de l'utilisateur",
      "5.2c": "Identifier les critères de faisabilité d'un projet informatique",
      "5.2d": "Définir et mettre en œuvre une démarche de suivi de projet" } },
    3: { titre: "Participer à la conception et à la mise en œuvre d'un projet système d'information", acs: {
      "5.3a": "Mesurer les impacts économiques, sociétaux et technologiques d'un projet informatique",
      "5.3b": "Intégrer un projet informatique dans le système d'information d'une organisation",
      "5.3c": "Adapter un système d'information" } } } },
  C6: { nom: "Collaborer au sein d'une équipe informatique", court: "Équipe", niveaux: {
    1: { titre: "Identifier ses aptitudes pour travailler dans une équipe", acs: {
      "6.1a": "Appréhender l'écosystème numérique",
      "6.1b": "Découvrir les aptitudes requises selon les secteurs informatiques",
      "6.1c": "Identifier les statuts, fonctions et rôles dans une équipe pluridisciplinaire",
      "6.1d": "Acquérir les compétences interpersonnelles pour travailler en équipe" } },
    2: { titre: "Situer son rôle et ses missions au sein d'une équipe informatique", acs: {
      "6.2a": "Comprendre la diversité et la structure de l'informatique dans une organisation",
      "6.2b": "Appliquer une démarche pour intégrer une équipe informatique",
      "6.2c": "Mobiliser les compétences interpersonnelles nécessaires",
      "6.2d": "Rendre compte de son activité professionnelle" } },
    3: { titre: "Manager une équipe informatique", acs: {
      "6.3a": "Organiser et partager une veille numérique",
      "6.3b": "Identifier les enjeux de l'économie de l'innovation numérique",
      "6.3c": "Guider la conduite du changement informatique dans une organisation",
      "6.3d": "Accompagner le management de projet informatique" } } } }
};

/* PROJETS
   liens : { Cx: { "AC": { preuve: "texte", aConfirmer: true|false } } }
   images : chemins vers assets/img/ (facultatif)
   ressources : [{ label, url }] (dépôts, vidéos, PDF…) */
const PROJETS = [
  {
    id: "sae-bd",
    nom: "SAE Base de données",
    periode: "BUT1",
    equipe: "En groupe",
    resume: "Conception et exploitation de la base de données d'une boutique en ligne de câbles.",
    contexte: "SAE de première année consacrée à la conception et à l'exploitation d'une base de données relationnelle à partir d'un cahier des charges.",
    objectif: "Réaliser le MCD, créer la base et interroger les données : utilisateurs, catalogue de câbles, panier, commandes et suivi de leur état.",
    role: "Modélisation du MCD, création de la base sous PostgreSQL et écriture des requêtes SQL.",
    resultats: "Base fonctionnelle, requêtes abouties et livrables conformes.",
    outils: ["PostgreSQL", "pgAdmin", "SQL", "MCD / MLD"],
    images: [],        // ex. ["assets/img/sae-bd-mcd.png"]
    ressources: [],    // ex. [{ label: "Script SQL", url: "assets/docs/sae-bd.sql" }]
    liens: {
      C4: {
        "4.1c": { preuve: "MCD de 8 entités (utilisateur, câble, commande, état…) construit à partir du cahier des charges." },
        "4.1a": { preuve: "Script de création de la base et requêtes d'interrogation." },
        "4.2b": { preuve: "Intégrité référentielle assurée par des clés primaires composées et des clés étrangères.", aConfirmer: true }
      },
      C6: {
        "6.1d": { preuve: "Travail de modélisation réparti au sein du groupe." }
      }
    }
  },
  {
    id: "sae-echecs",
    nom: "SAE Jeu d'échecs",
    periode: "BUT1",
    equipe: "En équipe",
    resume: "Moteur de jeu d'échecs en Java avec détection de l'échec et mat.",
    contexte: "SAE de première année de développement en équipe.",
    objectif: "Implémenter un moteur de jeu d'échecs capable de détecter l'échec et l'échec et mat.",
    role: "Développement du moteur, écriture des jeux de tests et préparation de la soutenance.",
    resultats: "Fonctionnalités opérationnelles, soutenance réussie.",
    outils: ["Java", "Git / GitHub", "Tests"],
    images: [],
    ressources: [],   // ajouter le lien GitHub, la vidéo et les jeux de tests
    liens: {
      C5: {
        "5.1b": { preuve: "Dépôt Git partagé et branches pour organiser le travail de l'équipe." }
      },
      C6: {
        "6.1d": { preuve: "Développement à plusieurs sur un même code." },
        "6.2d": { preuve: "Soutenance et vidéo de démonstration de l'échec et mat." }
      }
    }
  },
  {
    id: "sae-algo",
    nom: "SAE Recherche algorithmique",
    periode: "BUT1",
    equipe: "Individuel, encadré",
    resume: "Comparaison de stratégies de recherche de chemin dans un labyrinthe.",
    contexte: "Projet individuel encadré portant sur la recherche de solutions optimisées.",
    objectif: "Comparer plusieurs stratégies de recherche dans un labyrinthe.",
    role: "Implémentation des algorithmes, analyse comparative et présentation orale.",
    resultats: "Présentation orale et analyse comparative des algorithmes.",
    outils: ["Algorithmique", "Modélisation"],
    images: [],
    ressources: [],
    liens: {
      C6: {
        "6.2d": { preuve: "Présentation orale de l'analyse comparative." }
      }
    }
  },
  {
    id: "minetarouille",
    nom: "MineTaRouille",
    periode: "S2, 2024–2025",
    equipe: "3 personnes, 2 mois",
    resume: "Jeu 2D de type Terraria en Java et JavaFX.",
    contexte: "SAE S2.01, S2.02, S2.05 et S2.06, réalisées autour d'un même projet de jeu.",
    objectif: "Développer un jeu où le joueur mine, pose des blocs et se déplace, avec un rendu fluide et une sauvegarde de la partie.",
    role: "Gestion des blocs (types, comportements, interactions), inventaire graphique, déplacements avec gravité et collisions.",
    resultats: "Jeu jouable avec génération de carte, inventaire et sauvegarde. Architecture MVC et choix techniques documentés.",
    outils: ["Java", "JavaFX", "Architecture MVC", "Git / GitHub", "Trello", "IntelliJ"],
    images: [],      // ex. ["assets/img/mine-blocs.png", "assets/img/mine-inventaire.png"]
    ressources: [{ label: "Dépôt GitHub", url: "https://github.com/Bloombtw/MineTaRouille" }],
    liens: {
      C4: {
        "4.2d": { preuve: "Système de sauvegarde et modélisation des entités du jeu.", aConfirmer: true }
      },
      C5: {
        "5.1b": { preuve: "Tableau Trello et branches Git pour suivre les tâches." },
        "5.1c": { preuve: "Découpage du projet en phases sur deux mois." }
      },
      C6: {
        "6.1c": { preuve: "Rôles répartis entre les trois membres : blocs, inventaire, déplacement." },
        "6.1d": { preuve: "Collaboration à trois sur le même dépôt." },
        "6.2d": { preuve: "Présentation technique du projet et choix documentés." }
      }
    }
  },
  {
    id: "sae-web",
    nom: "SAE Développement web",
    periode: "BUT2",
    equipe: "Avec Sorana et Djeneba",
    resume: "Application web réalisée à trois.",
    contexte: "À compléter.",
    objectif: "À compléter.",
    role: "À compléter.",
    resultats: "À compléter.",
    outils: ["À compléter"],
    images: [],
    ressources: [{ label: "Dépôt GitHub", url: "https://github.com/DUT-Info-Montreuil/SAE_Dev_Web_Anton_Sorana_Djeneba" }],
    aCompleter: true,
    liens: {
      C4: {
        "4.1a": { preuve: "Requêtes vers la base de l'application.", aConfirmer: true },
        "4.2c": { preuve: "Affichage des données dans l'application.", aConfirmer: true }
      },
      C5: {
        "5.1b": { preuve: "Dépôt Git commun.", aConfirmer: true }
      },
      C6: {
        "6.1d": { preuve: "Projet mené à trois.", aConfirmer: true }
      }
    }
  }
];
