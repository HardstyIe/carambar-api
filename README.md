# 🍬 Carambar Jokes API

API REST pour gérer les blagues Carambar - Projet de sélection CDA (Concepteur Développeur d'Applications)

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://carambar-api-pepi.onrender.com/api-docs)
[![Node.js](https://img.shields.io/badge/node.js-20.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Technologies](#technologies)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Sécurité](#sécurité)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)

---

## 🎯 Aperçu

API RESTful permettant de gérer une collection de blagues Carambar avec les opérations CRUD complètes. L'API inclut la documentation Swagger, la validation des données, la limitation de débit et est déployée en production.

**🔗 Liens utiles :**
- 🌐 API en production : https://carambar-api-pepi.onrender.com
- 📚 Documentation Swagger : https://carambar-api-pepi.onrender.com/api-docs
- ❤️ Health Check : https://carambar-api-pepi.onrender.com/health
- 🎨 Frontend : https://hardstyie.github.io/carambar-front

---

## 🛠️ Technologies

### Stack principale
- **Runtime** : Node.js 20.x
- **Framework** : Express.js
- **Langage** : TypeScript
- **ORM** : Sequelize
- **Base de données** : SQLite
- **Documentation** : Swagger (OpenAPI 3.0)

### Sécurité & Performance
- **Helmet** : Sécurisation des headers HTTP
- **Express Rate Limit** : Protection contre les abus
- **Express Validator** : Validation stricte des données
- **CORS** : Gestion des requêtes cross-origin
- **Compression** : Optimisation des réponses

### DevOps
- **Docker** : Containerisation
- **Docker Compose** : Orchestration
- **Render** : Hébergement cloud

---

## ✨ Fonctionnalités

- ✅ CRUD complet sur les blagues
- ✅ Endpoint pour blague aléatoire
- ✅ Documentation Swagger interactive
- ✅ Auto-seed de la base de données
- ✅ Validation des données (longueur, format)
- ✅ Rate limiting (100 req/15min global, 10 créations/heure)
- ✅ Headers sécurisés (Helmet)
- ✅ Gestion d'erreurs centralisée
- ✅ Architecture MVC
- ✅ API versionnée (v1)
- ✅ Compression des réponses
- ✅ Health check endpoint

---

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

```bash
# Cloner le repository
git clone https://github.com/HardstyIe/carambar-api.git
cd carambar-api

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Seed la base de données
npm run seed

# Lancer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

---

## ⚙️ Configuration

Créez un fichier `.env` à la racine :

```env
NODE_ENV=development
PORT=3000
API_VERSION=v1
DB_STORAGE=./database.sqlite
DB_LOGGING=true
```

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NODE_ENV` | Environnement (development/production) | development |
| `PORT` | Port du serveur | 3000 |
| `API_VERSION` | Version de l'API | v1 |
| `DB_STORAGE` | Chemin vers la base SQLite | ./database.sqlite |
| `DB_LOGGING` | Activer les logs Sequelize | false |

---

## 🚀 Utilisation

### Scripts disponibles

```bash
# Développement avec hot-reload
npm run dev

# Build TypeScript
npm run build

# Production
npm start

# Seed la base de données
npm run seed
```

---

## 📡 API Endpoints

Base URL : `https://carambar-api-pepi.onrender.com/api/v1`

### Health Check

```http
GET /health
```

**Réponse** : `200 OK`
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Blagues

#### Récupérer toutes les blagues

```http
GET /api/v1/jokes
```

**Réponse** : `200 OK`
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "question": "Quelle est la femelle du hamster ?",
      "answer": "L'Amsterdam",
      "createdAt": "2026-01-14T00:00:00.000Z",
      "updatedAt": "2026-01-14T00:00:00.000Z"
    }
  ]
}
```

#### Récupérer une blague par ID

```http
GET /api/v1/jokes/:id
```

**Paramètres** :
- `id` (number, required) : ID de la blague

**Réponse** : `200 OK` | `404 Not Found` | `400 Bad Request`

#### Récupérer une blague aléatoire

```http
GET /api/v1/jokes/random
```

**Réponse** : `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 5,
    "question": "Quel est le sport le plus fruité ?",
    "answer": "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
    "createdAt": "2026-01-14T00:00:00.000Z",
    "updatedAt": "2026-01-14T00:00:00.000Z"
  }
}
```

#### Créer une blague

```http
POST /api/v1/jokes
Content-Type: application/json
```

**Body** :
```json
{
  "question": "Pourquoi les poissons n'aiment pas jouer au tennis ?",
  "answer": "Parce qu'ils ont peur du filet"
}
```

**Validations** :
- `question` : 3-500 caractères, requis
- `answer` : 1-500 caractères, requis

**Rate limit** : 10 créations par heure par IP

**Réponse** : `201 Created` | `400 Bad Request`

---

## 🐳 Docker

### Avec Docker Compose (recommandé)

```bash
# Build et démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

### Script d'installation automatique

```bash
# Rendre le script exécutable
chmod +x setup.sh

# Lancer l'installation complète
./setup.sh
```

Le script installe tout automatiquement : dépendances, build, seed, Docker.

---

## 🔒 Sécurité

### Mesures implémentées

- **Helmet** : Protection contre les vulnérabilités courantes (XSS, clickjacking, etc.)
- **Rate Limiting** :
  - Global : 100 requêtes / 15 minutes par IP
  - Création : 10 blagues / heure par IP
- **Express Validator** : Validation stricte des inputs (longueur, format)
- **CORS** : Configuration des origines autorisées
- **Compression** : Réduction de la taille des réponses
- **Error Handler** : Gestion centralisée des erreurs
- **Sanitization** : Échappement des caractères HTML dangereux

---

## 🌐 Déploiement

### Render (Production)

L'API est déployée sur Render avec :
- Auto-deploy depuis GitHub
- Variables d'environnement configurées
- Health checks activés
- HTTPS automatique

**URL** : https://carambar-api-pepi.onrender.com

### Configuration Render

**Build Command** : `npm install && npm run build`  
**Start Command** : `node dist/src/server.js`

**Variables d'environnement** :
```
NODE_ENV=production
PORT=3000
API_VERSION=v1
DB_STORAGE=./database.sqlite
DB_LOGGING=false
```

---

## 📁 Structure du projet

```
carambar-api/
├── src/
│   ├── config/
│   │   ├── database.ts       # Configuration Sequelize
│   │   └── swagger.ts         # Configuration Swagger
│   ├── models/
│   │   └── Joke.ts            # Modèle Sequelize Joke
│   ├── controllers/
│   │   └── jokeController.ts  # Logique métier
│   ├── routes/
│   │   └── jokeRoutes.ts      # Définition des routes
│   ├── middlewares/
│   │   ├── errorHandler.ts    # Gestion d'erreurs
│   │   ├── security.ts         # Rate limiting
│   │   └── validation.ts       # Validateurs
│   ├── utils/
│   │   └── seedDatabase.ts    # Seed initial
│   ├── data/
│   │   └── jokes.ts           # Données des blagues
│   └── server.ts              # Point d'entrée
├── logs/                      # Logs applicatifs
├── .env.example               # Template des variables d'env
├── Dockerfile                 # Image Docker
├── docker-compose.yml         # Orchestration
├── setup.sh                   # Script d'installation
├── package.json
└── tsconfig.json
```

---

## 📊 Diagrammes

### Architecture MVC

```
Client → Routes → Controllers → Models → Database
                     ↓
                Middlewares (Validation, Security)
```

### Flux d'une requête

```
1. Request → CORS → Helmet → Rate Limiter
2. → Router → Validator
3. → Controller → Model → SQLite
4. → Response ← Error Handler (si erreur)
```

---

## 🧪 Tests

### Avec Swagger

1. Ouvrir https://carambar-api-pepi.onrender.com/api-docs
2. Cliquer sur "Try it out"
3. Tester les endpoints directement

### Avec curl

```bash
# Health check
curl https://carambar-api-pepi.onrender.com/health

# Toutes les blagues
curl https://carambar-api-pepi.onrender.com/api/v1/jokes

# Blague aléatoire
curl https://carambar-api-pepi.onrender.com/api/v1/jokes/random

# Créer une blague
curl -X POST https://carambar-api-pepi.onrender.com/api/v1/jokes \
  -H "Content-Type: application/json" \
  -d '{"question":"Test ?","answer":"Test !"}'
```

---

## 👤 Auteur

**Dylan Duchemin**  
Projet CDA - Wild Code School

---

## 📄 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- Wild Code School pour l'accompagnement
- Carambar & Co pour l'inspiration
- La communauté open-source pour les outils utilisés

---

**Made with 💙 and TypeScript**
