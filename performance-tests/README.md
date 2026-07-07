# 🚀 Tests de Performance (k6) - SNM Docs

Ce dossier contient toute la suite de tests de charge professionnels pour simuler du trafic sur votre site.

## 🛠️ Prérequis

1. **Installer k6** :
   Ouvrez PowerShell en administrateur et tapez :
   ```bash
   winget install k6
   ```
   *(Fermez et rouvrez votre terminal après l'installation)*

2. **Démarrer le serveur local** :
   Avant de lancer un test, vous devez simuler le serveur de production. Dans le dossier `snm-docs`, lancez :
   ```bash
   npm run preview
   ```
   *Le serveur écoutera sur `http://localhost:4173`.*

## 🧪 Exécution des Tests

Ouvrez un **deuxième terminal** (pendant que le premier fait tourner le serveur) et lancez le test de votre choix depuis le dossier `snm-docs` :

- `npm run test:smoke` : Vérifie juste que le serveur répond (1 utilisateur). Idéal pour s'assurer que tout marche.
- `npm run test:load` : **Test classique.** Simule une journée normale (jusqu'à 50 utilisateurs).
- `npm run test:stress` : **Trouver la limite.** Pousse le serveur très fort (400 utilisateurs virtuels) pour voir s'il crashe.
- `npm run test:spike` : **Pic d'influence.** Simule un afflux massif et soudain en 10 secondes.
- `npm run test:soak` : **Endurance.** Test de 15 minutes pour vérifier les fuites de mémoire (Memory Leaks).

## 📊 Comment lire les résultats ?

À la fin d'un test, k6 affiche un résumé :
- **http_req_duration** : Le temps moyen que le serveur a mis pour répondre (idéalement en dessous de 500ms).
- **http_reqs** : Le nombre total de requêtes réussies pendant le test.
- **http_req_failed** : Le pourcentage d'erreurs (doit rester proche de 0.00%). S'il augmente, c'est que le serveur "crashe".

*(Ces tests sont parfaits pour démontrer vos compétences DevOps/QA lors de votre soutenance PFA !)*
