import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL, COMMON_THRESHOLDS, ENDPOINTS } from './config.js';
import { checkStatus, commonHeaders } from './utils.js';

export const options = {
    // Test d'endurance (Soak Test) : Teste les fuites de mémoire en gardant une charge constante sur une longue période
    stages: [
        { duration: '2m', target: 100 }, // Montée
        { duration: '10m', target: 100 }, // Reste pendant 10 minutes !
        { duration: '2m', target: 0 },    // Descente
    ],
    thresholds: COMMON_THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINTS.home}`, { headers: commonHeaders() });
    checkStatus(res);
    sleep(1);
}
