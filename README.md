# Mon vieux Grimoire

## Comment lancer le projet ?

### Depuis le dossier frontend

#### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet.

### Depuis le dossier backend

#### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `nodemon` pour lancer le serveur.

Le projet a été testé sur node 19.

#####  Lien pour voir 
```
La documentation de l'API avec Swagger http://localhost:4000/api/docs/
```

Pour lire la documentation, utiliser **Chrome** ou **Firefox**

# Mon vieux Grimoire - Développez le back-end d'un site de notation de livres

## Projet 

Projet 7 Mon vieux Grimoire 

### Scénario :

En tant que développeur Back-End freelance dans la région de Lille, Kévin, un développeur Front-End, m'a contacté pour mutualiser nos compétences sur un projet qui lui a été proposé. La chaîne de librairie lilloise \"Le Vieux Grimoire\" souhaite développer son propre site de notation de livres, \"Mon Vieux Grimoire\". Ma mission dans ce projet est de développer le Back-End de leur site.

### Mes objectifs :

- Implémenter un modèle logique de données conformément à la réglementation ;
*  Mettre en œuvre des opérations CRUD de manière sécurisée ;
*  Stocker des données de manière sécurisée.

### Description :

Dans le cadre de ce projet, j'ai dû créer un serveur avec Node.js, mettre en place une API avec Express.js, utiliser le package Mongoose pour faciliter la création des schémas de données et simplifier la connexion à la base de données NoSQL, MongoDB. J'ai également mis en place l'ajout d'un nouvel utilisateur avec le hachage (bcrypt) de son mot de passe pour l'enregistrer dans la base de données. De plus, j'ai intégré un middleware pour gérer l'authentification (JWT) de l'utilisateur sur les routes où cela était nécessaire. Une des attentes de ce projet était de prendre en compte la taille des images. Pour ce faire j'ai mis en place un configuraton de multer où j'ai utilisé un autre depancdance, Sharp.

### Contraintes techniques :

-   https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf
