import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL, COMMON_THRESHOLDS, ENDPOINTS } from './config.js';
import { checkStatus, commonHeaders } from './utils.js';

export const options = {
    // Test Spike : Simule un afflux soudain de trafic (ex: lien viral sur les réseaux sociaux)
    stages: [
        { duration: '10s', target: 50 },  // Rapide montée
        { duration: '1m', target: 50 },   // Stabilité
        { duration: '10s', target: 300 }, // 🚀 PIC SOUDAIN
        { duration: '30s', target: 300 }, // Reste au pic
        { duration: '30s', target: 0 },   // Chute rapide
    ],
    thresholds: COMMON_THRESHOLDS,
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINTS.home}`, { headers: commonHeaders() });
    checkStatus(res);
    sleep(1);
}
