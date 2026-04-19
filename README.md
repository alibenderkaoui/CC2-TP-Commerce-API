# CC2 - API REST Système Commercial

## Gestion Clients, Produits et Commandes

**Technologies :** Node.js | Express.js | MongoDB | Mongoose  
**Architecture :** MVC avec Express Router  
**Auteur :** Ali_Benderkaoui  
**Année :** 2024 - 2025

---

## Description du Projet

Ce projet consiste à développer une mini API REST avec Node.js, Express.js et MongoDB pour gérer les données d'un petit système commercial. L'API permet de gérer trois modules métier principaux : les **clients**, les **produits** et les **commandes**.

Le projet est organisé selon une architecture inspirée du modèle MVC (Modèle-Vue-Contrôleur), en utilisant des modèles Mongoose pour représenter les données MongoDB, des contrôleurs pour traiter les requêtes HTTP, et des routeurs Express pour séparer les routes de chaque module.

---

## Technologies Utilisées

| Technologie | Version | Rôle |
|---|---|---|
| Node.js | 18+ | Runtime JavaScript côté serveur |
| Express.js | 4.21+ | Framework web pour API REST |
| MongoDB | 6.0+ | Base de données NoSQL orientée documents |
| Mongoose | 8.10+ | ODM pour MongoDB avec validation de schémas |

---

## Structure du Projet

```
CC2-TP-Commerce-API/
├── config/
│   └── db.js                    # Configuration connexion MongoDB
├── models/
│   ├── Client.js                # Modèle Client (Mongoose)
│   ├── Produit.js               # Modèle Produit (Mongoose)
│   └── Commande.js              # Modèle Commande (Mongoose)
├── controllers/
│   ├── clientController.js      # Contrôleur Clients (CRUD)
│   ├── produitController.js     # Contrôleur Produits (CRUD)
│   └── commandeController.js    # Contrôleur Commandes (CRUD)
├── routes/
│   ├── clientRoutes.js          # Routes Clients (Express Router)
│   ├── produitRoutes.js         # Routes Produits (Express Router)
│   └── commandeRoutes.js        # Routes Commandes (Express Router)
├── server.js                    # Point d'entrée de l'application
├── package.json                 # Dépendances du projet
└── .gitignore                   # Fichiers ignorés par Git
```

---

## Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- MongoDB (en cours d'exécution sur le port 27017)

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd CC2-TP-Commerce-API

# Installer les dépendances
npm install
```

### Démarrage

```bash
# Démarrer le serveur
npm start

# Ou en mode développement (avec nodemon)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## Endpoints API

### Clients

| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/clients | Créer un client |
| GET | /api/clients | Lister tous les clients |
| GET | /api/clients/:id | Récupérer un client |
| PUT | /api/clients/:id | Modifier un client |
| DELETE | /api/clients/:id | Supprimer un client |

### Produits

| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/produits | Créer un produit |
| GET | /api/produits | Lister tous les produits |
| GET | /api/produits/:id | Récupérer un produit |
| PUT | /api/produits/:id | Modifier un produit |
| DELETE | /api/produits/:id | Supprimer un produit |

### Commandes

| Méthode | Endpoint | Description |
|---|---|---|
| POST | /api/commandes | Créer une commande |
| GET | /api/commandes | Lister les commandes |
| GET | /api/commandes/:id | Récupérer une commande |
| PUT | /api/commandes/:id | Modifier une commande |
| DELETE | /api/commandes/:id | Supprimer une commande |

---

## Exemples de Requêtes

### Créer un client
```json
POST /api/clients
{
    "nomComplet": "Ali_Benderkaoui",
    "email": "Aliben@example.com",
    "telephone": "0600000000",
    "ville": "Casablanca"
}
```

### Créer un produit
```json
POST /api/produits
{
    "nomProduit": "Ordinateur Portable",
    "categorie": "Electronique",
    "prix": 5999.99,
    "quantiteStock": 50
}
```

### Créer une commande
```json
POST /api/commandes
{
    "client": "<client_id>",
    "produits": [
        { "produit": "<produit_id>", "quantite": 2 }
    ]
}
```
