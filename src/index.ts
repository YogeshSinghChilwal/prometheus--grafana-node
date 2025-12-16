import express from 'express'
import { middleware } from './middleware.js';
import client from 'prom-client'
import { metricsMiddleware } from './metrics/index.js';

const app = express()
const port = 8080;

app.use(express.json())
app.use(middleware)
app.use(metricsMiddleware)

app.get("/", (req, res) => {
    res.json({message: "Hello Yogesh!"})
})

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics()
    res.set('Content-Type', client.register.contentType)
    res.end(metrics) 
})


app.listen(port, () => {console.log("Server is running on port 8080")})