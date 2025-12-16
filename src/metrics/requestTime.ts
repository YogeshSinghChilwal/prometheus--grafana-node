import client from 'prom-client'

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_req_duration_ms',
    help: "Duration of HTTP request in ms",
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 100, 300, 500, 1000, 3000, 5000]
})