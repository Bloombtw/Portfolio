#!/bin/bash
# Installation de la pile Apache, MySQL, PHP sur la machine virtuelle Linux

# 1. Mise à jour du système
sudo apt update && sudo apt upgrade -y

# 2. Installation des logiciels
sudo apt install -y apache2 mysql-server php libapache2-mod-php php-mysql

# 3. Démarrage automatique des services
sudo systemctl enable --now apache2 mysql

# 4. Base de données et utilisateur dédié
sudo mysql <<SQL
CREATE DATABASE poste_dev CHARACTER SET utf8mb4;
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'mot_de_passe';
GRANT ALL PRIVILEGES ON poste_dev.* TO 'dev'@'localhost';
SQL

# 5. Vérification des versions installées
apache2 -v
mysql --version
php -v
python3 --version
