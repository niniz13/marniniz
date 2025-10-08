# Projet MarNiniz
## Introduction
Ce projet est un site de recettes développé avec Next.js, pensé pour offrir une expérience culinaire moderne, rapide et intuitive. L’objectif est de permettre aux utilisateurs de découvrir, partager et gérer facilement leurs recettes préférées à travers une interface fluide et responsive. Grâce aux fonctionnalités de rendu côté serveur et à la structure modulaire de Next.js, le site allie performance, référencement optimisé (SEO) et simplicité de développement.

## Technologies utilisées

Voici les principales technologies utilisées pour ce projet :

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) Next.js
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) Vercel
- ![TheMealDB](https://img.shields.io/badge/TheMealDB-FF5733?style=for-the-badge&logo=react&logoColor=white) TheMealDB API
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) Tailwind CSS
- ![NextAuth](https://img.shields.io/badge/NextAuth-8B5CF6?style=for-the-badge&logo=nextauth.js&logoColor=white) NextAuth

## L'API TheMealDB

Voici les différentes route API qui seront utilisé

### Rechercher des recettes

```http
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

### Obtenir le detail d'une recette 

```http
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

### Obtenir une recette aléatoire

```http
https://www.themealdb.com/api/json/v1/1/random.php
```

### Lister les catégories

```http
https://www.themealdb.com/api/json/v1/1/categories.php
```