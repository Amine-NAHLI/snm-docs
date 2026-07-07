import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL, COMMON_THRESHOLDS, ENDPOINTS } from './config.js';
import { checkStatus, commonHeaders } from './utils.js';

export const options = {
    // Test de Stress : Pousse le serveur à ses limites pour trouver le point de rupture
    stages: [
        { duration: '1m', target: 100 }, 
        { duration: '1m', target: 200 }, 
        { duration: '1m', target: 400 }, // Limite extrême pour un serveur local
        { duration: '1m', target: 0 },   // Récupération
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // Tolérance plus haute pour le stress
        http_req_failed: ['rate<0.05'],    // 5% d'erreur acceptables sous stress extrême
    },
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINTS.home}`, { headers: commonHeaders() });
    checkStatus(res);
    sleep(1);
}
