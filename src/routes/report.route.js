import express from "express"
import { pool } from "../db/postgres.js"

const router = express.Router()

/**
 * GET /api/reports
 * Report: total sales & quantity per year and month
 */
router.get("/", async (req, res) => {
    try {
        const query = `
      SELECT
        t.year,
        t.month,
        SUM(f.total_amount) AS total_sales,
        SUM(f.quantity_sold) AS total_quantity
      FROM fact_sales f
      JOIN dim_time t ON f.time_id = t.time_id
      GROUP BY t.year, t.month
      ORDER BY t.year, t.month
    `

        const { rows } = await pool.query(query)

        res.status(200).json(rows)
    } catch (error) {
        console.error("Report error:", error)
        res.status(500).json({
            message: "Failed to fetch report data",
        })
    }
})

export default router
