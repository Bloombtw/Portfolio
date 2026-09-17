-- Extrait de la structure de la base de la buvette (MySQL)
-- Un utilisateur peut être membre de plusieurs associations, avec un rôle dans chacune.

CREATE TABLE Utilisateur (
  id_user int NOT NULL AUTO_INCREMENT,
  nom     varchar(50)  NOT NULL,
  prenom  varchar(50)  NOT NULL,
  email   varchar(150) NOT NULL,
  mdp     varchar(255) NOT NULL,          -- empreinte password_hash()
  solde   decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (id_user),
  UNIQUE KEY email (email)
);

CREATE TABLE Role (
  id_role int NOT NULL AUTO_INCREMENT,
  nom     varchar(50) NOT NULL,           -- Administrateur, Barman, Membre, Gestionnaire
  PRIMARY KEY (id_role)
);

CREATE TABLE Membre (
  id_user        int NOT NULL,
  id_association int NOT NULL,
  id_role        int NOT NULL DEFAULT '3',
  PRIMARY KEY (id_user, id_association, id_role),
  CONSTRAINT fk_membre_user FOREIGN KEY (id_user)
    REFERENCES Utilisateur (id_user) ON DELETE CASCADE,
  CONSTRAINT fk_membre_asso FOREIGN KEY (id_association)
    REFERENCES Association (id_association) ON DELETE CASCADE,
  CONSTRAINT fk_membre_role FOREIGN KEY (id_role)
    REFERENCES Role (id_role)
);

-- Panier validé par le barman grâce à un code
CREATE TABLE Panier_validation (
  id_panier       int NOT NULL AUTO_INCREMENT,
  code_validation varchar(50) NOT NULL,
  id_client       int NOT NULL,
  contenu         text NOT NULL,          -- produits et quantités en JSON
  montant_total   decimal(10,2) NOT NULL,
  etat            varchar(20) DEFAULT 'en_attente',
  date_creation   datetime DEFAULT CURRENT_TIMESTAMP,
  id_association  int NOT NULL,
  PRIMARY KEY (id_panier),
  CONSTRAINT Panier_validation_ibfk_1 FOREIGN KEY (id_client)
    REFERENCES Utilisateur (id_user) ON DELETE CASCADE
);
