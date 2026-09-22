/* =========================================================
   DONNÉES DU PORTFOLIO — c'est le seul fichier à modifier
   pour ajouter un projet, une preuve ou une étape de la frise.
   ========================================================= */

const PROFIL = {
  nom: "Anton Meimoun",
  formation: "BUT Informatique, IUT de Montreuil",
  ecole: "iut",          // clé dans ORGANISMES
  parcours: "Parcours C : administration, gestion et exploitation des données",
  accroche: "Étudiant en 3e année, passionné par la data et l'intelligence artificielle. Je conçois des bases de données et les applications qui les exploitent, en équipe et de bout en bout.",
  objectif: "Mettre mes compétences en données au service d'une équipe, et approfondir la data et l'intelligence artificielle dans un environnement tourné vers l'innovation.",
  // Déposer le CV dans assets/docs/ puis renseigner son chemin
  cv: "",               // ex. "assets/docs/CV_Anton_Meimoun.pdf"
  github: "https://github.com/Bloombtw",
  linkedin: "https://www.linkedin.com/in/anton-meimoun-69a4522a6/",
  email: "meimounanton@gmail.com",
  // Photo : remplacer assets/img/photo.jpg par une image carrée (au moins 400 × 400 px)
  photo: "assets/img/photo.jpg"
};

/* PAGE « À PROPOS » */
const PERSO = {
  titre: "Bonjour, moi c'est Anton.",
  presentation: [
    "Étudiant en troisième année de BUT Informatique à l'IUT de Montreuil, je suis le parcours C, consacré à l'administration, à la gestion et à l'exploitation des données.",
    "Je suis passionné par la data et l'intelligence artificielle. J'aime partir de données brutes, les nettoyer, les structurer puis les rendre utiles, comme dans la SAE sur la qualité de l'air mondial.",
    "Je veux mettre ces compétences en pratique au sein d'une équipe dynamique et continuer à apprendre dans un environnement tourné vers l'innovation."
  ],
  enBref: [
    ["Formation", "BUT Informatique, 3e année"],
    ["Parcours", "C · données"],
    ["Baccalauréat", "Général, mention bien"],
    ["Expérience", "Stage de 8 semaines à l'AFPOLS"]
  ],
  moteurs: [
    { titre: "La data et l'IA", texte: "Comprendre ce que racontent les données, et comment l'intelligence artificielle peut les exploiter." },
    { titre: "Construire", texte: "Passer d'un besoin à une application qui fonctionne : un jeu, une buvette, une base de données." },
    { titre: "Le travail d'équipe", texte: "Répartir les tâches, relire le code ensemble et accueillir de nouveaux membres dans un projet." }
  ],
  qualites: [
    { titre: "Communication pédagogique", texte: "Un an d'encadrement scolaire bénévole." },
    { titre: "Gestion du temps", texte: "Accompagnement d'élèves en parallèle des études." },
    { titre: "Autonomie", texte: "Avancer seul sur ma partie, avec GitHub pour suivre mon travail." },
    { titre: "Résolution de problèmes", texte: "Débogage méthodique sous IntelliJ." }
  ],
  interets: [
    { titre: "Violoncelle", chiffre: "9 ans", texte: "Neuf ans de pratique, pour la rigueur et l'écoute." },
    { titre: "Football", texte: "Le plaisir du jeu collectif." },
    { titre: "Musculation", texte: "La régularité et le dépassement de soi." }
  ]
};

/* ORGANISMES : écoles et entreprises, affichés avec leur logo
   (fichier dans assets/img/logos/) sur une tuile blanche */
const ORGANISMES = {
  iut: { nom: "IUT de Montreuil, Université Paris 8", logo: "iut-montreuil.png", url: "https://www.iut.univ-paris8.fr/" },
  afpols: { nom: "AFPOLS", logo: "afpols.png", url: "https://www.afpols.fr/" }
};

/* OUTILS : liste « Outils » de l'accueil, et logos des fiches projets.
   cat : catégorie (une ligne par catégorie sur l'accueil)
   logo : fichier dans assets/img/logos/. Sans extension, « .svg » est ajouté ;
          un PNG s'écrit avec son extension (ex. "javafx.png"). Les fichiers
          « mono-….svg » sont des icônes d'une seule couleur.
   alias : autres noms sous lesquels l'outil apparaît dans les projets
   desc : texte affiché au survol */
const OUTILS = [
  { cat: "Langages", nom: "Java", logo: "java", desc: "MineTaRouille (JavaFX, MVC) et le moteur du jeu d'échecs." },
  { cat: "Langages", nom: "Python", logo: "python", desc: "Scripts d'extraction, de nettoyage et de fusion de données (SAE Qualité de l'air)." },
  { cat: "Langages", nom: "JavaScript", logo: "javascript", desc: "Interactions côté navigateur, dont ce portfolio." },
  { cat: "Langages", nom: "PHP", logo: "php", desc: "Back-end orienté objet de la buvette associative : sessions, routage, PDO." },
  { cat: "Langages", nom: "C", logo: "c.png", desc: "Programmation bas niveau : mémoire, pointeurs, structures." },
  { cat: "Langages", nom: "SQL", logo: "mono-sql", desc: "Création de bases, contraintes, jointures et index." },
  { cat: "Langages", nom: "HTML / CSS", logo: "html", alias: ["HTML", "CSS"], desc: "Sites web, interface responsive de la buvette et ce portfolio." },
  { cat: "Données", nom: "PostgreSQL", logo: "postgresql", desc: "SGBD de la SAE Base de données : boutique en ligne complète." },
  { cat: "Données", nom: "MySQL", logo: "mysql", desc: "Base relationnelle de la buvette et du poste de développement." },
  { cat: "Données", nom: "MongoDB", logo: "mongodb", desc: "Base de données orientée documents." },
  { cat: "Données", nom: "pgAdmin", logo: "mono-pgadmin", desc: "Administration et interrogation des bases PostgreSQL." },
  { cat: "Données", nom: "Qlik", logo: "qlik", desc: "Visualisation d'un sous-ensemble des données sur la qualité de l'air." },
  { cat: "Conception", nom: "Modélisation MCD / MLD", logo: "mono-mcd", alias: ["MCD / MLD", "Modélisation", "Modélisation relationnelle"], desc: "Modèles conceptuels et logiques construits à partir d'un cahier des charges." },
  { cat: "Conception", nom: "UML", logo: "mono-uml", desc: "Diagrammes de classes et de cas d'utilisation." },
  { cat: "Conception", nom: "Architecture MVC", logo: "mono-mvc", alias: ["MVC"], desc: "Séparation modèle, vue, contrôleur dans MineTaRouille et la buvette." },
  { cat: "Conception", nom: "Design Patterns", logo: "mono-patterns", desc: "Solutions de conception réutilisables, appliquées pendant la refactorisation de MineTaRouille." },
  { cat: "Frameworks", nom: "JavaFX", logo: "javafx.png", desc: "Interface graphique de MineTaRouille : rendu du monde et inventaire." },
  { cat: "Frameworks", nom: "JUnit", logo: "junit", alias: ["Tests"], desc: "Tests unitaires des projets Java." },
  { cat: "Outils", nom: "Git / GitHub", logo: "git", alias: ["Git"], desc: "Dépôts partagés, branches et suivi du travail en équipe." },
  { cat: "Outils", nom: "Trello", logo: "trello", desc: "Suivi des tâches de MineTaRouille et du site pour les JO." },
  { cat: "Outils", nom: "IntelliJ", logo: "intellij", desc: "IDE JetBrains pour Java et PHP." },
  { cat: "Outils", nom: "PyCharm", logo: "pycharm", desc: "IDE pour les scripts Python." },
  { cat: "Outils", nom: "VS Code", logo: "vscode", desc: "Éditeur pour le web et les scripts." },
  { cat: "Outils", nom: "Suite Office", logo: "office", desc: "Rapports, présentations et documents de projet." },
  { cat: "Systèmes", nom: "Bash", logo: "bash", desc: "Commandes et scripts shell sous Linux." },
  { cat: "Systèmes", nom: "Linux", logo: "mono-linux", desc: "Environnement de travail quotidien, poste virtuel de développement." },
  { cat: "Systèmes", nom: "Windows", logo: "windows", desc: "Poste personnel et parc applicatif en stage." },
  { cat: "Systèmes", nom: "Apache", logo: "apache", desc: "Serveur web du poste de développement (Apache, PHP, MySQL)." },
  { cat: "Systèmes", nom: "VirtualBox", logo: "mono-virtualbox", desc: "Machine virtuelle Linux configurée pour le développement." }
];

/* Logos des notions citées dans les projets mais absentes de la liste OUTILS */
const AUTRES_LOGOS = {
  "Algorithmique": "mono-algo",
  "Modélisation OLAP": "mono-olap",
  "Cybersécurité": "mono-cyber",
  "Parc applicatif": "mono-parc",
  "Nettoyage de données": "mono-data"
};

/* COMPÉTENCES du BUT Informatique, parcours C (référentiel national V34ABC)
   Le parcours C mobilise les six compétences : C1 à C3 aux niveaux 1 et 2,
   C4 à C6 aux niveaux 1 à 3.
   Code d'un apprentissage critique (AC) dans les projets : « 4.2c » =
   compétence 4, niveau 2, AC 3 (a = AC 1, b = AC 2…). */
const COMPETENCES = {
  C1: { nom: "Réaliser un développement d'application", court: "Réaliser",
    description: "Développer — c'est-à-dire concevoir, coder, tester et intégrer — une solution informatique pour un client.",
    composantes: ["En respectant les besoins décrits par le client", "En appliquant les principes algorithmiques", "En veillant à la qualité du code et à sa documentation", "En choisissant les ressources techniques appropriées"],
    situations: ["Élaborer une application informatique", "Faire évoluer une application informatique", "Maintenir en conditions opérationnelles une application informatique"],
    niveaux: {
    1: { titre: "Développer des applications informatiques simples", acs: {
      "1.1a": "Implémenter des conceptions simples",
      "1.1b": "Élaborer des conceptions simples",
      "1.1c": "Faire des essais et évaluer leurs résultats en regard des spécifications",
      "1.1d": "Développer des interfaces utilisateurs" } },
    2: { titre: "Partir des exigences et aller jusqu'à une application complète", acs: {
      "1.2a": "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences",
      "1.2b": "Appliquer des principes d'accessibilité et d'ergonomie",
      "1.2c": "Adopter de bonnes pratiques de conception et de programmation",
      "1.2d": "Vérifier et valider la qualité de l'application par les tests" } } } },
  C2: { nom: "Optimiser des applications", court: "Optimiser",
    description: "Proposer des applications informatiques optimisées en fonction de critères spécifiques : temps d'exécution, précision, consommation de ressources…",
    composantes: ["En formalisant et modélisant des situations complexes", "En recensant les algorithmes et les structures de données usuels", "En s'appuyant sur des schémas de raisonnement", "En justifiant les choix et validant les résultats"],
    situations: ["Améliorer les performances des programmes dans des contextes contraints", "Limiter l'impact environnemental d'une application informatique", "Mettre en place des applications informatiques adaptées et innovantes"],
    niveaux: {
    1: { titre: "Appréhender et construire des algorithmes", acs: {
      "2.1a": "Analyser un problème avec méthode (découpage en éléments algorithmiques simples, structure de données…)",
      "2.1b": "Comparer des algorithmes pour des problèmes classiques (tris simples, recherche…)",
      "2.1c": "Formaliser et mettre en œuvre des outils mathématiques pour l'informatique" } },
    2: { titre: "Sélectionner les algorithmes adéquats pour répondre à un problème donné", acs: {
      "2.2a": "Choisir des structures de données complexes adaptées au problème",
      "2.2b": "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes (recherche opérationnelle, méthodes arborescentes, optimisation globale, intelligence artificielle…)",
      "2.2c": "Comprendre les enjeux et moyens de sécurisation des données et du code",
      "2.2d": "Évaluer l'impact environnemental et sociétal des solutions proposées" } } } },
  C3: { nom: "Administrer des systèmes informatiques communicants complexes", court: "Administrer",
    description: "Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des infrastructures, des services et des réseaux et optimiser le système informatique d'une organisation.",
    composantes: ["En sécurisant le système d'information", "En appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité", "En offrant une qualité de service optimale", "En assurant la continuité d'activité"],
    situations: ["Déployer une nouvelle architecture technique", "Améliorer une infrastructure existante", "Sécuriser les applications et les services"],
    niveaux: {
    1: { titre: "Installer et configurer un poste de travail", acs: {
      "3.1a": "Identifier les différents composants (matériels et logiciels) d'un système numérique",
      "3.1b": "Utiliser les fonctionnalités de base d'un système multitâches / multiutilisateurs",
      "3.1c": "Installer et configurer un système d'exploitation et des outils de développement",
      "3.1d": "Configurer un poste de travail dans un réseau d'entreprise" } },
    2: { titre: "Déployer des services dans une architecture réseau", acs: {
      "3.2a": "Concevoir et développer des applications communicantes",
      "3.2b": "Utiliser des serveurs et des services réseaux virtualisés",
      "3.2c": "Sécuriser les services et données d'un système" } } } },
  C4: { nom: "Gérer des données de l'information", court: "Gérer",
    description: "Concevoir, gérer, administrer et exploiter les données de l'entreprise et mettre à disposition toutes les informations pour un bon pilotage de l'entreprise.",
    composantes: ["En respectant les réglementations sur le respect de la vie privée et la protection des données personnelles", "En respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)", "En s'appuyant sur des bases mathématiques", "En assurant la cohérence et la qualité"],
    situations: ["Lancer un nouveau projet", "Sécuriser des données", "Exploiter des données pour la prise de décisions"],
    niveaux: {
    1: { titre: "Concevoir et mettre en place une base de données à partir d'un cahier des charges client", acs: {
      "4.1a": "Mettre à jour et interroger une base de données relationnelle (en requêtes directes ou à travers une application)",
      "4.1b": "Visualiser des données",
      "4.1c": "Concevoir une base de données relationnelle à partir d'un cahier des charges" } },
    2: { titre: "Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité", acs: {
      "4.2a": "Optimiser les modèles de données de l'entreprise",
      "4.2b": "Assurer la confidentialité des données (intégrité et sécurité)",
      "4.2c": "Organiser la restitution de données à travers la programmation et la visualisation",
      "4.2d": "Manipuler des données hétérogènes" } },
    3: { titre: "Administrer une base de données, concevoir et réaliser des systèmes d'informations décisionnels", acs: {
      "4.3a": "Capturer et stocker des ensembles volumineux et complexes de données hétérogènes",
      "4.3b": "Préparer et extraire les données pour l'exploitation",
      "4.3c": "Appliquer des méthodes d'exploration et d'exploitation des données (apprentissage, informatique décisionnelle ou fouille de données)",
      "4.3d": "Mettre en production et optimiser le système de gestion de données de l'entreprise" } } } },
  C5: { nom: "Conduire un projet", court: "Conduire",
    description: "Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.",
    composantes: ["En communiquant efficacement avec les différents acteurs d'un projet", "En respectant les règles juridiques et les normes en vigueur", "En sensibilisant à une gestion éthique, responsable, durable et interculturelle", "En adoptant une démarche proactive, créative et critique"],
    situations: ["Lancer un nouveau projet", "Piloter le maintien d'un projet en condition opérationnelle", "Faire évoluer un système d'information"],
    niveaux: {
    1: { titre: "Identifier les besoins métiers des clients et des utilisateurs", acs: {
      "5.1a": "Appréhender les besoins du client et de l'utilisateur",
      "5.1b": "Mettre en place les outils de gestion de projet",
      "5.1c": "Identifier les acteurs et les différentes phases d'un cycle de développement" } },
    2: { titre: "Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs", acs: {
      "5.2a": "Identifier les processus présents dans une organisation en vue d'améliorer les systèmes d'information",
      "5.2b": "Formaliser les besoins du client et de l'utilisateur",
      "5.2c": "Identifier les critères de faisabilité d'un projet informatique",
      "5.2d": "Définir et mettre en œuvre une démarche de suivi de projet" } },
    3: { titre: "Participer à la conception et à la mise en œuvre d'un projet système d'information", acs: {
      "5.3a": "Mesurer les impacts économiques, sociétaux et technologiques d'un projet informatique",
      "5.3b": "Savoir intégrer un projet informatique dans le système d'information d'une organisation",
      "5.3c": "Savoir adapter un système d'information" } } } },
  C6: { nom: "Collaborer au sein d'une équipe informatique", court: "Collaborer",
    description: "Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.",
    composantes: ["En inscrivant sa démarche au sein d'une équipe pluridisciplinaire", "En accompagnant la mise en œuvre des évolutions informatiques", "En veillant au respect des contraintes juridiques", "En développant une communication efficace et collaborative"],
    situations: ["Lancer un nouveau projet", "Organiser son travail en relation avec celui de son équipe", "Élaborer, gérer et transmettre de l'information"],
    niveaux: {
    1: { titre: "Identifier ses aptitudes pour travailler dans une équipe", acs: {
      "6.1a": "Appréhender l'écosystème numérique",
      "6.1b": "Découvrir les aptitudes requises selon les différents secteurs informatiques",
      "6.1c": "Identifier les statuts, les fonctions et les rôles de chaque membre d'une équipe pluridisciplinaire",
      "6.1d": "Acquérir les compétences interpersonnelles pour travailler en équipe" } },
    2: { titre: "Situer son rôle et ses missions au sein d'une équipe informatique", acs: {
      "6.2a": "Comprendre la diversité, la structure et la dimension de l'informatique dans une organisation (ESN, DSI…)",
      "6.2b": "Appliquer une démarche pour intégrer une équipe informatique au sein d'une organisation",
      "6.2c": "Mobiliser les compétences interpersonnelles pour intégrer une équipe informatique",
      "6.2d": "Rendre compte de son activité professionnelle" } },
    3: { titre: "Manager une équipe informatique", acs: {
      "6.3a": "Organiser et partager une veille numérique",
      "6.3b": "Identifier les enjeux de l'économie de l'innovation numérique",
      "6.3c": "Guider la conduite du changement informatique au sein d'une organisation",
      "6.3d": "Accompagner le management de projet informatique" } } } }
};

/* Regroupement des compétences pour l'affichage */
const GROUPES = [
  { nom: "Concevoir et développer", texte: "Écrire, tester et optimiser des applications.", comps: ["C1", "C2"] },
  { nom: "Systèmes et données", texte: "Installer les infrastructures et exploiter les données : le cœur du parcours C.", comps: ["C3", "C4"] },
  { nom: "Piloter et collaborer", texte: "Conduire les projets et travailler en équipe.", comps: ["C5", "C6"] }
];

/* PROJETS, du plus ancien au plus récent
   annee : rattache le projet à une étape de la frise (BUT1, BUT2, BUT3)
   stage : true pour un stage
   liens : { Cx: { "AC": { preuve: "texte", aConfirmer: true|false } } }
   outils : noms d'outils ; ceux qui ont un logo s'affichent en logo
   details : points clés affichés en liste (facultatif)
   images : [{ src, legende }] vers assets/img/projets/ (facultatif)
   code : [{ titre, fichier, langage }] extraits dans assets/code/ (facultatif)
          langage : java, sql, bash, php, python…
   organisme : clé dans ORGANISMES (entreprise d'un stage…)
   ressources : [{ label, url }] (dépôts, vidéos, PDF dans assets/docs/…) */
const PROJETS = [
  {
    id: "sae-echecs",
    nom: "Le jeu d'échecs",
    annee: "BUT1",
    periode: "BUT1",
    equipe: "En équipe",
    resume: "Implémentation d'un besoin client : un moteur de jeu d'échecs en Java.",
    contexte: "SAE de première année de développement en équipe, à partir d'un besoin client.",
    objectif: "Implémenter un moteur de jeu d'échecs capable de détecter l'échec et l'échec et mat.",
    role: "Développement du moteur, écriture des jeux de tests et préparation de la soutenance.",
    resultats: "Fonctionnalités opérationnelles, soutenance réussie.",
    outils: ["Java", "JUnit", "Git / GitHub"],
    details: [
      "Code découpé en classes : Main (déroulement), Menu (saisies), Plateau et Pieces (règles).",
      "Échiquier représenté par un tableau char[8][8] : majuscules pour les noirs, minuscules pour les blancs.",
      "Au lancement : saisie des deux pseudos, tirage du joueur qui a les blancs, puis tours alternés.",
      "Tests JUnit sur les règles : pièces alliées, obstacles sur le trajet, prise d'une pièce adverse, obstacles du roque."
    ],
    images: [],
    code: [
      { titre: "Boucle de jeu", fichier: "assets/code/echecs/Main.java", langage: "java" },
      { titre: "Tests unitaires des règles", fichier: "assets/code/echecs/Junit.java", langage: "java" }
    ],
    ressources: [],   // ajouter le lien GitHub et la vidéo
    liens: {
      C1: {
        "1.1a": { preuve: "Moteur d'échecs implémenté en Java à partir du besoin client." },
        "1.1c": { preuve: "Tests JUnit sur les règles : pièces alliées, obstacles, prises, roque." }
      },
      C2: {
        "2.1a": { preuve: "Règles découpées en fonctions : obstacle sur le trajet, prise, roque, sur un tableau char[8][8]." }
      },
      C5: {
        "5.1a": { preuve: "Moteur développé pour répondre au besoin exprimé par le client." },
        "5.1b": { preuve: "Dépôt Git partagé et branches pour organiser le travail de l'équipe." }
      },
      C6: {
        "6.1d": { preuve: "Développement à plusieurs sur un même code." },
        "6.2d": { preuve: "Soutenance et démonstration de la détection de l'échec et mat." }
      }
    }
  },
  {
    id: "sae-poste",
    nom: "Poste de développement",
    annee: "BUT1",
    periode: "BUT1",
    equipe: "Individuel puis en groupe",
    resume: "Installation d'un poste virtuel Linux avec MySQL, Apache2 et PHP.",
    contexte: "SAE d'installation d'un poste pour le développement.",
    objectif: "Installer un poste virtuel Linux équipé de MySQL, Apache2 et PHP, créer une base de données, puis un site qui en affiche le contenu.",
    role: "Configuration individuelle de chaque logiciel, puis mise en commun à travers un site PHP servi par Apache qui affiche le contenu de la base créée en amont.",
    resultats: "Poste fonctionnel et site web affichant les données de la base.",
    outils: ["Linux", "VirtualBox", "Apache", "MySQL", "PHP", "Bash", "Python"],
    details: [
      "Machine virtuelle Linux créée sous VirtualBox.",
      "Pile Apache, MySQL et PHP installée avec apt, services lancés au démarrage avec systemctl.",
      "Base MySQL dédiée et utilisateur aux droits limités à cette base.",
      "Page PHP servie par Apache qui lit la base avec PDO et l'affiche dans un tableau.",
      "Vérification des versions installées, dont Python 3.11.7 pour les scripts."
    ],
    images: [
      { src: "assets/img/projets/poste-terminal.png", legende: "Vérification de l'environnement dans le terminal : Python 3.11.7." }
    ],
    code: [
      { titre: "Installation du poste", fichier: "assets/code/poste/installation.sh", langage: "bash" },
      { titre: "Page qui affiche la base", fichier: "assets/code/poste/index.php", langage: "php" }
    ],
    ressources: [],
    liens: {
      C3: {
        "3.1a": { preuve: "Identification des logiciels à installer : serveur web, SGBD, langage de script.", aConfirmer: true },
        "3.1b": { preuve: "Utilisation du terminal Linux pour installer et gérer les services." },
        "3.1c": { preuve: "Installation et configuration d'une machine virtuelle Linux avec Apache, MySQL et PHP." },
        "3.2b": { preuve: "Services web et base de données hébergés sur une machine virtuelle.", aConfirmer: true }
      },
      C4: {
        "4.1a": { preuve: "Base MySQL créée puis interrogée depuis le site PHP." },
        "4.1b": { preuve: "Page web qui affiche le contenu de la base.", aConfirmer: true }
      },
      C6: {
        "6.1a": { preuve: "Installation et configuration d'un environnement Linux, Apache, MySQL, PHP.", aConfirmer: true }
      }
    }
  },
  {
    id: "sae-jo",
    nom: "Site pour les JO",
    annee: "BUT1",
    periode: "BUT1",
    equipe: "En équipe",
    resume: "Création d'un site web autour des Jeux olympiques, en réponse à un besoin client.",
    contexte: "SAE de première année : concevoir un site web pour un client.",
    objectif: "Créer un site web qui réponde au besoin exprimé par le client.",
    role: "Création du site et suivi de l'équipe via Trello.",
    resultats: "Site web livré.",
    outils: ["HTML / CSS", "Trello"],
    images: [],
    ressources: [],
    aCompleter: true,
    liens: {
      C1: {
        "1.1d": { preuve: "Pages du site web pour les JO." }
      },
      C5: {
        "5.1a": { preuve: "Site conçu pour répondre au besoin du client." },
        "5.1b": { preuve: "Tableau Trello pour suivre les tâches de l'équipe." }
      },
      C6: {
        "6.1d": { preuve: "Travail en équipe coordonné sur Trello.", aConfirmer: true }
      }
    }
  },
  {
    id: "sae-bd",
    nom: "Création d'une base de données",
    annee: "BUT1",
    periode: "BUT1 · SAE 1.04",
    equipe: "En groupe",
    resume: "Base de données relationnelle complète d'une boutique en ligne, sous PostgreSQL.",
    contexte: "SAE 1.04 consacrée à la conception et à l'exploitation d'une base de données relationnelle à partir d'un cahier des charges.",
    objectif: "Concevoir et mettre en place la base d'une boutique en ligne : utilisateurs, catalogue, panier, commandes et suivi de leur état.",
    role: "Modèles conceptuel et logique (MCD, MLD), création de la base sous PostgreSQL, écriture et optimisation des requêtes (jointures, contraintes, index), jeu de données de test.",
    resultats: "Base fonctionnelle, peuplée et testée avec 5 utilisateurs et 50 produits. Livrables et documentation conformes.",
    outils: ["PostgreSQL", "pgAdmin", "SQL", "MCD / MLD"],
    images: [],        // ex. ["assets/img/sae-bd-mcd.png"]
    ressources: [],
    liens: {
      C4: {
        "4.1c": { preuve: "MCD et MLD construits à partir du cahier des charges." },
        "4.1a": { preuve: "Script de création, jeu de test de 5 utilisateurs et 50 produits, requêtes d'interrogation." },
        "4.2a": { preuve: "Requêtes optimisées avec des jointures et des index.", aConfirmer: true },
        "4.2b": { preuve: "Cohérence des données assurée par des contraintes et des clés étrangères." }
      },
      C6: {
        "6.1d": { preuve: "Travail de modélisation réparti au sein du groupe." }
      }
    }
  },
  {
    id: "sae-algo",
    nom: "Recherche algorithmique",
    annee: "BUT1",
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
      C2: {
        "2.1a": { preuve: "Modélisation du labyrinthe et découpage des algorithmes de recherche." },
        "2.1b": { preuve: "Comparaison de plusieurs stratégies de recherche de chemin." }
      },
      C6: {
        "6.2d": { preuve: "Présentation orale de l'analyse comparative." }
      }
    }
  },
  {
    id: "minetarouille",
    nom: "MineTaRouille",
    annee: "BUT1",
    periode: "BUT1 · S2, 2024–2025",
    equipe: "3 personnes, 2 mois",
    resume: "Jeu 2D de type Terraria en Java et JavaFX, en programmation orientée objet.",
    contexte: "SAE S2.01, S2.02, S2.05 et S2.06, réalisées autour d'un même projet de jeu.",
    objectif: "Développer un jeu où le joueur mine, pose des blocs et se déplace, avec un rendu fluide et une sauvegarde de la partie.",
    role: "Gestion des blocs (types, comportements, interactions), inventaire graphique, déplacements avec gravité et collisions.",
    resultats: "Jeu jouable avec génération de carte, inventaire et sauvegarde. Architecture MVC et choix techniques documentés.",
    outils: ["Java", "JavaFX", "Architecture MVC", "Git / GitHub", "Trello", "IntelliJ"],
    details: [
      "Moteur de jeu et interfaces en JavaFX, avec génération de la carte.",
      "Monde stocké dans des tableaux à deux dimensions, choisis pour les performances.",
      "Blocs : types, comportements et interactions (miner, poser).",
      "Inventaire graphique : barre d'objets avec leurs quantités.",
      "Déplacement du joueur avec gravité et collisions.",
      "Sauvegarde de la partie et modélisation des entités du jeu.",
      "GitHub pour les versions et les branches, Trello pour les tâches, débogage sous IntelliJ et choix techniques documentés."
    ],
    images: [
      { src: "assets/img/projets/mtr-jeu.png", legende: "Le monde généré, avec le joueur à la surface." },
      { src: "assets/img/projets/mtr-blocs.png", legende: "Rendu des blocs." },
      { src: "assets/img/projets/mtr-inventaire.png", legende: "Rendu de l'inventaire." },
      { src: "assets/img/projets/mtr-deplacement.png", legende: "Rendu du déplacement du joueur." }
    ],
    ressources: [
      { label: "Dépôt GitHub", url: "https://github.com/Bloombtw/MineTaRouille" },
      { label: "Présentation (PDF)", url: "assets/docs/presentation-minetarouille.pdf" }
    ],
    liens: {
      C1: {
        "1.1a": { preuve: "Moteur de jeu et génération de la carte en Java." },
        "1.1b": { preuve: "Conception en MVC des blocs, de l'inventaire et du joueur." },
        "1.1d": { preuve: "Interfaces JavaFX : rendu du monde et inventaire graphique." }
      },
      C2: {
        "2.1a": { preuve: "Monde représenté par des tableaux à deux dimensions." },
        "2.2a": { preuve: "Structures de données choisies pour les performances du rendu.", aConfirmer: true }
      },
      C4: {
        "4.2d": { preuve: "Système de sauvegarde et modélisation des entités du jeu." }
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
    id: "sae-buvette",
    nom: "Buvette associative",
    annee: "BUT2",
    periode: "BUT2 · 3 mois, 2025",
    equipe: "3 personnes (Anton, Sorana, Djeneba)",
    resume: "Application web PHP de gestion d'une buvette associative, en architecture MVC.",
    contexte: "SAE de développement web : une plateforme de gestion pour une buvette associative, hébergée localement.",
    objectif: "Concevoir une application aux rôles distincts : espace client, administration, module barman, module gestionnaire et sélection de l'association, avec une authentification sécurisée.",
    role: "Analyse et conception (personas, user stories, backlog), modélisation de la base MySQL, back-end PHP orienté objet (sessions, routage, accès aux données par PDO), hachage des mots de passe, interface ergonomique et responsive.",
    resultats: "Application fonctionnelle, structurée en modèles, vues et contrôleurs pour chaque module, avec authentification par mots de passe hachés.",
    outils: ["PHP", "MySQL", "SQL", "Architecture MVC", "HTML / CSS", "IntelliJ", "Git / GitHub"],
    details: [
      "Base MySQL de 9 tables : Utilisateur, Role, Membre, Association, Produit, Categorie, Panier_validation, Historique, Depenses.",
      "Quatre rôles (administrateur, barman, membre, gestionnaire) ; un utilisateur peut appartenir à plusieurs associations avec un rôle dans chacune.",
      "Panier validé au comptoir grâce à un code, avec un état (en attente, validé, annulé) et son contenu en JSON.",
      "Solde de chaque membre, historique des achats et des rechargements, suivi des stocks et des dépenses.",
      "Intégrité assurée par des clés étrangères (suppression en cascade) et une adresse e-mail unique."
    ],
    images: [
      { src: "assets/img/projets/buvette-panier.png", legende: "Panier d'un membre : solde, détail de la commande et bouton Commander." }
    ],
    code: [
      { titre: "Structure de la base (extrait)", fichier: "assets/code/buvette/structure.sql", langage: "sql" }
    ],
    ressources: [{ label: "Dépôt GitHub", url: "https://github.com/DUT-Info-Montreuil/SAE_Dev_Web_Anton_Sorana_Djeneba" }],
    liens: {
      C1: {
        "1.2a": { preuve: "Personas, user stories et backlog traduits en modules métiers." },
        "1.2b": { preuve: "Interface ergonomique et responsive." },
        "1.2c": { preuve: "Architecture MVC complète et PHP orienté objet." }
      },
      C2: {
        "2.2c": { preuve: "Mots de passe hachés avec password_hash." }
      },
      C3: {
        "3.2a": { preuve: "Application web client-serveur hébergée localement.", aConfirmer: true },
        "3.2c": { preuve: "Authentification sécurisée et sessions.", aConfirmer: true }
      },
      C4: {
        "4.1c": { preuve: "Base relationnelle MySQL modélisée pour les utilisateurs et les modules métiers." },
        "4.1a": { preuve: "Script SQL de structure et requêtes via PDO." },
        "4.2b": { preuve: "Mots de passe hachés (password_hash) et sessions pour l'authentification." },
        "4.2c": { preuve: "Données restituées par programmation dans les vues de chaque module." }
      },
      C5: {
        "5.1a": { preuve: "Personas construits pour comprendre les utilisateurs de la buvette." },
        "5.2b": { preuve: "Besoins formalisés en user stories et en backlog." },
        "5.1b": { preuve: "Dépôt Git commun." }
      },
      C6: {
        "6.1d": { preuve: "Projet mené à trois." }
      }
    }
  },
  {
    id: "refacto-mtr",
    nom: "Refactorisation de MineTaRouille",
    annee: "BUT2",
    periode: "BUT2",
    equipe: "En équipe, avec un nouveau membre",
    resume: "Reprise du jeu : propreté du code, journaux de bord, suivi Git et soutenance.",
    contexte: "SAE de deuxième année : reprendre et améliorer le code de MineTaRouille.",
    objectif: "Mettre en avant la propreté du code, documenter le travail dans des journaux de bord et suivre l'avancement avec Git.",
    role: "Création du nouveau dépôt, intégration d'un nouveau membre (explication du code, de la documentation Markdown et du Trello, aide à la configuration de son environnement), relecture du code en groupe et répartition des tâches de refactorisation.",
    resultats: "Code refactorisé, journaux de bord tenus et soutenance.",
    outils: ["Java", "JavaFX", "Design Patterns", "Git / GitHub", "Trello", "IntelliJ"],
    images: [],
    ressources: [],
    liens: {
      C1: {
        "1.2c": { preuve: "Refactorisation axée sur la propreté du code et les design patterns." }
      },
      C5: {
        "5.1b": { preuve: "Nouveau dépôt Git et tableau Trello pour suivre les fonctionnalités." },
        "5.2d": { preuve: "Journaux de bord et suivi Git de l'avancement." }
      },
      C6: {
        "6.1c": { preuve: "Tâches de refactorisation déléguées à chaque membre après une relecture commune." },
        "6.2b": { preuve: "Intégration d'un nouveau membre : présentation du code, de la documentation et du Trello." },
        "6.2c": { preuve: "Accompagnement du nouveau membre dans la configuration de son environnement." },
        "6.2d": { preuve: "Journaux de bord et soutenance." }
      }
    }
  },
  {
    id: "sae-air",
    nom: "Qualité de l'air mondial",
    annee: "BUT2",
    periode: "BUT2 · SAE S4.C.01, 2026",
    equipe: "4 personnes (Djeneba Diallo, Anton Meimoun, Yanis Ouadah, Ilyes Brahim)",
    resume: "Croisement de données mondiales sur la pollution de l'air, la démographie et l'économie.",
    contexte: "SAE S4.C.01 de gestion et qualité des données, à partir de trois sources : OpenAQ (pollution), World Cities (démographie) et la Banque mondiale (indicateurs socio-économiques).",
    objectif: "Analyser et croiser ces jeux de données dans une base relationnelle, puis dans un modèle multidimensionnel adapté à l'analyse.",
    role: "Scripts Python d'extraction, de nettoyage, de dédoublonnage et de fusion des fichiers CSV. Base normalisée en 3NF de 6 tables (Pays, Ville, Station, Polluant, Mesure, indicateur_pays). Schéma en constellation à deux tables de faits (mesures horaires, indicateurs annuels). Visualisation dans Qlik et rapport.",
    resultats: "Requêtes analytiques en moyenne 15 fois plus rapides qu'avec le modèle relationnel. Visualisation d'un sous-ensemble des données et rapport explicatif.",
    outils: ["Python", "SQL", "Modélisation relationnelle", "Modélisation OLAP", "Nettoyage de données", "Qlik", "PyCharm"],
    details: [
      "Trois sources : OpenAQ (PM2.5, PM10, NO₂, CO, O₃, SO₂), World Cities (environ 40 000 villes) et les indicateurs de la Banque mondiale.",
      "World Cities sert de table pivot : iso2 pour rejoindre OpenAQ, iso3 pour la Banque mondiale.",
      "Scripts Python : fusion des CSV d'OpenAQ (en-têtes normalisés, doublons supprimés) et pivot des indicateurs par pays et par année.",
      "Nettoyage : doublons, valeurs nulles, négatives ou aberrantes écartées ; noms de villes et codes pays harmonisés.",
      "Modèle relationnel en 3NF : Pays, Ville, Station, Mesure, Polluant (avec le seuil OMS) et indicateur_pays.",
      "Schéma en constellation : deux tables de faits, les mesures (valeur rapportée au seuil OMS, score de fiabilité) et les indicateurs annuels, qui partagent les dimensions Temps et Pays.",
      "Dimension Temps découpée en année, mois et jour pour des ROLLUP et CUBE sans fonction de date."
    ],
    images: [
      { src: "assets/img/projets/air-mcd.png", legende: "Modèle conceptuel (MCD)." },
      { src: "assets/img/projets/air-mld.png", legende: "Modèle logique (MLD) avec les clés étrangères." },
      { src: "assets/img/projets/air-constellation.png", legende: "Modèle multidimensionnel en constellation." }
    ],
    ressources: [{ label: "Rapport détaillé (PDF)", url: "assets/docs/rapport-sae-s4-qualite-air.pdf" }],
    liens: {
      C4: {
        "4.2a": { preuve: "Modèle normalisé en 3NF puis schéma en constellation, 15 fois plus rapide sur les requêtes analytiques." },
        "4.2c": { preuve: "Visualisation d'un sous-ensemble des données dans Qlik." },
        "4.2d": { preuve: "Fusion de trois sources CSV hétérogènes (OpenAQ, World Cities, Banque mondiale)." },
        "4.3a": { preuve: "Stockage de mesures horaires mondiales et d'indicateurs annuels.", aConfirmer: true },
        "4.3b": { preuve: "Scripts Python d'extraction, de nettoyage et de dédoublonnage.", aConfirmer: true },
        "4.3c": { preuve: "Exploration des données par le modèle multidimensionnel.", aConfirmer: true }
      },
      C6: {
        "6.1d": { preuve: "Collaboration au sein d'un groupe de quatre étudiants." }
      }
    }
  },
  {
    id: "stage-afpols",
    nom: "Stage à l'AFPOLS",
    stage: true,
    organisme: "afpols",
    annee: "Stage",
    periode: "BUT2 · 8 semaines, 2026",
    equipe: "Stage en entreprise",
    resume: "Mise en œuvre d'un plan d'action de cybersécurité et gestion du parc applicatif.",
    contexte: "Stage de 8 semaines au sein de l'AFPOLS.",
    objectif: "Mettre en œuvre un plan d'action de cybersécurité et gérer le parc applicatif.",
    role: "À compléter.",
    resultats: "À compléter.",
    outils: ["Cybersécurité", "Parc applicatif", "Windows"],
    images: [],
    ressources: [],
    aCompleter: true,
    liens: {
      C3: {
        "3.2c": { preuve: "Plan d'action de cybersécurité.", aConfirmer: true }
      },
      C4: {
        "4.2b": { preuve: "Mise en œuvre d'un plan d'action de cybersécurité.", aConfirmer: true }
      },
      C5: {
        "5.2a": { preuve: "Gestion du parc applicatif de la structure.", aConfirmer: true },
        "5.2d": { preuve: "Suivi du plan d'action.", aConfirmer: true }
      },
      C6: {
        "6.2a": { preuve: "Découverte de l'organisation informatique d'une structure.", aConfirmer: true },
        "6.2b": { preuve: "Intégration dans l'équipe informatique pendant 8 semaines.", aConfirmer: true }
      }
    }
  }
];

/* FRISE CHRONOLOGIQUE de l'accueil
   type : Formation, Expérience, Stage…
   annee : affiche les projets qui ont la même « annee »
   projet : lien vers la fiche d'un projet
   organisme : clé dans ORGANISMES, affiche son logo */
const FRISE = [
  { date: "2023", type: "Expérience", titre: "Encadrant scolaire bénévole",
    texte: "Un an d'accompagnement d'élèves : communication pédagogique et gestion du temps." },
  { date: "2024", type: "Formation", titre: "Baccalauréat général, mention bien",
    texte: "Lycée Maurice Ravel, Paris 12." },
  { date: "2024 – 2025", type: "Formation", titre: "BUT Informatique, 1re année", annee: "BUT1", organisme: "iut",
    texte: "IUT de Montreuil, Université Paris 8. Premiers projets en équipe : développement, bases de données, systèmes." },
  { date: "2025 – 2026", type: "Formation", titre: "BUT Informatique, 2e année", annee: "BUT2", organisme: "iut",
    texte: "Parcours C : administration, gestion et exploitation des données." },
  { date: "2026", type: "Stage", titre: "Stage à l'AFPOLS · 8 semaines", projet: "stage-afpols", organisme: "afpols",
    texte: "Mise en œuvre d'un plan d'action de cybersécurité et gestion du parc applicatif." },
  { date: "2026 – 2027", type: "Formation", titre: "BUT Informatique, 3e année", annee: "BUT3", organisme: "iut",
    texte: "Année en cours : les projets de 3e année viendront démontrer le niveau 3." }
];
