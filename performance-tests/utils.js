import { check } from 'k6';

export function checkStatus(response, expectedStatus = 200) {
    return check(response, {
        [`Statut est ${expectedStatus}`]: (r) => r.status === expectedStatus,
        'Temps de réponse acceptable (< 1000ms)': (r) => r.timings.duration < 1000,
    });
}

export function commonHeaders() {
    return {
        'User-Agent': 'k6-performance-test/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    };
}
