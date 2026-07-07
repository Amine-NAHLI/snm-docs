import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL, COMMON_THRESHOLDS, ENDPOINTS } from './config.js';
import { checkStatus, commonHeaders } from './utils.js';

export const options = {
    // 1 Virtual User (VU) pour une courte durée
    vus: 1,
    duration: '10s', // Test de vérification rapide
    thresholds: COMMON_THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINTS.home}`, { headers: commonHeaders() });
    checkStatus(res);
    sleep(1); // Simule le temps de lecture de l'utilisateur
}
