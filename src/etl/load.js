import { pool } from "../db/postgres.js"

export async function load(data) {
    for (const row of data) {

        const date = row.date

        if (isNaN(date)) {
            throw new Error("Invalid date in transform")
        }

        const year = date.getFullYear()
        const month = date.getMonth() + 1

        // 1️⃣ INSERT DIM TIME (IDEMPOTENT)
        await pool.query(
            `
      INSERT INTO dim_time (date, year, month)
      VALUES ($1, $2, $3)
      ON CONFLICT (date) DO NOTHING
      `,
            [date, year, month]
        )

        // 2️⃣ GET time_id
        const timeRes = await pool.query(
            `SELECT time_id FROM dim_time WHERE date = $1`,
            [date]
        )

        const time_id = timeRes.rows[0].time_id

        // 3️⃣ INSERT FACT
        await pool.query(
            `
      INSERT INTO fact_sales
        (time_id, product_id, customer_id, quantity_sold, total_amount)
      VALUES ($1, $2, $3, $4, $5)
      `,
            [
                time_id,
                row.product_id,
                row.customer_id,
                row.quantity_sold,
                row.total_amount
            ]
        )
    }
}
