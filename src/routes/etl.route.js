import express from 'express'
import { runEtl } from '../controllers/etl.controller.js'

const router = express.Router()

router.post('/run', runEtl)

export default router