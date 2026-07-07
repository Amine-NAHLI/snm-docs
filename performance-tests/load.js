import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL, COMMON_THRESHOLDS, ENDPOINTS } from './config.js';
import { checkStatus, commonHeaders } from './utils.js';

export const options = {
    // Test de charge classique : Simule un jour d'affluence normal
    stages: [
        { duration: '30s', target: 50 }, // Montée en charge à 50 utilisateurs en 30s
        { duration: '1m', target: 50 },  // Reste à 50 utilisateurs pendant 1 minute
        { duration: '30s', target: 0 },  // Baisse de la charge
    ],
    thresholds: COMMON_THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINTS.home}`, { headers: commonHeaders() });
    checkStatus(res);
    sleep(1);
}
