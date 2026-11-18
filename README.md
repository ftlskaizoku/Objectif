# Objectif

PWA de suivi d'objectifs : date de début, durée en jours, une case à cocher par jour.
React + Vite + Tailwind 4 · Firebase (Auth + Firestore) · Vercel.

## Démarrer
1. `npm install`
2. Copier `.env.example` en `.env.local` et remplir avec la config web Firebase
3. `npm run dev`

## Firebase
- Auth : activer Google et Email/Mot de passe
- Firestore : créer la base, puis coller `firestore.rules` dans l'onglet Règles
- Auth > Paramètres > Domaines autorisés : ajouter le domaine Vercel

## Déploiement
Pousser sur GitHub, importer le dépôt dans Vercel (preset Vite) et ajouter les 4 variables `VITE_FIREBASE_*`.

## Si l'écran reste vide ou bloqué sur « Chargement »
1. Vercel > Settings > Environment Variables : les 4 variables `VITE_FIREBASE_*` doivent exister, puis **redéployer**.
2. Firebase > Firestore Database : la base doit être créée et `firestore.rules` publié.
3. Firebase > Authentication > Domaines autorisés : ajouter le domaine `*.vercel.app` de l'app.
L'app affiche maintenant un message explicite pour chacun de ces cas.
