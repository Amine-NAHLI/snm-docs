# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Copie du reste du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Serveur web léger
FROM nginx:alpine

# Copie de la configuration optionnelle si nécessaire (on utilise celle par défaut d'Nginx ici)

# Le fichier vite.config.js utilise base: '/snm-docs/'.
# Pour que les chemins (scripts, css) fonctionnent correctement, on place les fichiers
# générés dans un sous-dossier /snm-docs du serveur web.
COPY --from=builder /app/dist /usr/share/nginx/html/snm-docs

# Redirection par défaut (optionnel, pour rediriger localhost/ vers localhost/snm-docs/)
# RUN echo '<meta http-equiv="refresh" content="0; url=/snm-docs/" />' > /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
