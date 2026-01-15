import express from 'express'
import etlRoutes from './routes/etl.route.js'
// import reportRoutes from './routes/report.route.js'

const app = express();
app.use(express.json())

// routes
app.use('/api/etl', etlRoutes)
// app.use('/api/reports', reportRoutes)

app.get('/api', (req, res) => {
    res.status(200).send('API connected')
})

export default app