# 🍳 Projet MarNiniz  

## 🥘 Introduction  
**MarNiniz** est un site de recettes développé avec **Next.js**, pensé pour offrir une expérience culinaire moderne, rapide et intuitive.  
L’objectif est de permettre aux utilisateurs de **découvrir, partager et gérer facilement leurs recettes préférées** à travers une interface fluide et responsive.  

Grâce au **rendu côté serveur (SSR)** et à la **structure modulaire** de Next.js, le site allie **performance**, **référencement optimisé (SEO)** et **simplicité de développement**.  

---

## ⚙️ Technologies utilisées  

Voici les principales technologies et outils utilisés dans ce projet :  

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) **Next.js**  
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) **Vercel** (hébergement)  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (design et mise en page)  
- ![NextAuth](https://img.shields.io/badge/NextAuth-8B5CF6?style=for-the-badge&logo=nextauth.js&logoColor=white) **NextAuth.js** (authentification sécurisée)  
- ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB Atlas** (base de données cloud)  
- ![i18next](https://img.shields.io/badge/i18n-026AA7?style=for-the-badge&logo=i18next&logoColor=white) **i18n / i18next** (internationalisation du site)  

---

## ✨ Fonctionnalités principales  

### 🔍 Recherche de recettes  
- Recherche dynamique par nom, catégorie ou ingrédient.  
- Filtres par **type de plat**, **temps de préparation**, **régime alimentaire**, etc.  

### 📖 Détail d’une recette  
- Affichage complet incluant :  
  - Ingrédients détaillés  
  - Instructions étape par étape  
  - Informations nutritionnelles  
- Mise en avant d’images haute qualité pour une expérience immersive.  

### ❤️ Favoris et likes  
- Les utilisateurs peuvent **aimer** une recette pour l’enregistrer dans leurs **favoris**.  
- Accès rapide à toutes les recettes aimées via le profil utilisateur.  

### 👤 Gestion du compte utilisateur  
- **Inscription et connexion** via NextAuth (email, OAuth, etc.)  
- **Page de profil** avec gestion des informations personnelles.  
- **Paramètres de compte** (préférences, langue, suppression du compte).  

### 🌍 Multilingue  
- Site disponible en **français** 🇫🇷 et **anglais** 🇬🇧 grâce à **i18n**.  
- Détection automatique de la langue selon le navigateur.  

### 📄 Pages supplémentaires  
- **À propos**  
- **Contact**  
- **Mentions légales**  
- **Politique de confidentialité**  

---

## 🚀 Installation et lancement du projet  

### 1. Cloner le dépôt  
```bash
git clone https://github.com/ton-utilisateur/marniniz.git
cd marniniz
```

### 2. Installer les dépendances
```bash
npm install
```

ou

```bash
yarn install
```

### 3. Configurer les variables d’environnement
Crée un fichier .env.local à la racine du projet et ajoute les clés nécessaires :
```bash
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/"
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```
Le site sera accessible à l’adresse :
👉 http://localhost:3000

### 5. Déploiement 
Le projet peut être déployé facilement sur Vercel :
Connecte ton dépôt GitHub à Vercel
Configure les variables d’environnement dans le dashboard
Le déploiement se fait automatiquement à chaque push sur la branche principale