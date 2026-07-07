// Configuration globale pour les tests k6
// Permet de changer l'URL facilement si vous testez en local ou en production.

export const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:4173'; // Force IPv4 pour éviter l'erreur "Connection refused"

// Seuils de performance (Thresholds)
export const COMMON_THRESHOLDS = {
    http_req_duration: ['p(95)<500'], // 95% des requêtes doivent répondre en moins de 500ms
    http_req_failed: ['rate<0.01'],   // Moins de 1% des requêtes peuvent échouer (erreurs 500/404)
};

export const ENDPOINTS = {
    home: '/snm-docs/',
};
