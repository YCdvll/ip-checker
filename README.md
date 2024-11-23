# IP Checker

Ce projet permet de récupérer l'adresse IP publique de ton serveur et de l'envoyer par email à une heure définie chaque jour. Il utilise Docker, Cron et un fichier `.env` pour configurer l'application.

## Prérequis

- Un serveur avec **Docker** installé.
- Accès SSH au serveur pour configurer les tâches Cron.
- Un **compte email** pour l'envoi d'emails (par exemple, un compte Gmail).
- Un fichier **`.env`** pour stocker les informations sensibles telles que les identifiants de l'email.

## Étapes d'installation

### 1. **Cloner le repository**

Clone ce projet sur ton serveur en utilisant la commande suivante :

```bash
git clone https://github.com/YCdvll/ip-checker.git
cd ip-checker
2. Créer le fichier .env
Le fichier .env contient les variables d'environnement nécessaires pour l'envoi d'emails. Crée ce fichier dans le répertoire racine du projet en utilisant l'une des méthodes suivantes :

Créer un fichier .env via nano :
bash
Copier le code
nano .env
Ajoute les lignes suivantes, en remplaçant les valeurs par tes informations personnelles :

makefile
Copier le code
EMAIL_HOST=yourdomain.com
EMAIL_USER=email@yourdomain.com
EMAIL_PASS=myPasswordIsNot123456
EMAIL_TO=email@yourdomain.com

Appuie sur Ctrl + O puis Entrée pour enregistrer, puis Ctrl + X pour quitter nano.

3. Construire l'image Docker
Construis l'image Docker pour l'application avec la commande suivante :

bash
Copier le code
docker build -t ip-sender .
4. Vérifier l'exécution manuelle
Pour vérifier que tout fonctionne, tu peux exécuter le conteneur Docker une fois manuellement :

bash
Copier le code
docker run --rm --env-file .env ip-sender
Cela devrait récupérer l'IP publique et l'envoyer par email à l'adresse spécifiée.

5. Configurer la tâche Cron
Pour exécuter le script tous les jours à 9h, nous allons configurer une tâche Cron.

Ouvrir la crontab pour l'édition :
bash
Copier le code
crontab -e
Ajouter une nouvelle tâche Cron
Ajoute la ligne suivante pour exécuter le script tous les jours à 9h :

bash
Copier le code
0 9 * * * docker run --rm --env-file /chemin/vers/.env ip-sender
0 9 * * * : Exécute la tâche tous les jours à 9h.
docker run --rm --env-file /chemin/vers/.env ip-sender : Lance le conteneur Docker en chargeant les variables du fichier .env.
Remarque : Remplace /chemin/vers/.env par le chemin absolu de ton fichier .env.

Appuie sur Ctrl + O puis Entrée pour enregistrer, puis Ctrl + X pour quitter.

6. Vérifier les tâches Cron
Pour vérifier que ta tâche Cron est bien enregistrée, tu peux exécuter la commande suivante :

bash
Copier le code
crontab -l
Cela devrait afficher la tâche que tu viens d'ajouter.

Débogage
Vérifier les logs de Cron : Si l'exécution ne fonctionne pas comme prévu, consulte les logs de Cron avec :

bash
Copier le code
grep CRON /var/log/syslog
Vérifier l'exécution Docker : Si tu rencontres un problème avec Docker, lance à nouveau le conteneur manuellement pour vérifier qu'il fonctionne correctement.

Sécuriser le fichier .env
Pour protéger tes informations sensibles, assure-toi que le fichier .env est lisible uniquement par toi :

bash
Copier le code
chmod 600 .env
Cela empêche les autres utilisateurs du serveur de lire le fichier.
