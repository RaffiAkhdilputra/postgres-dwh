import { pool } from '../db/postgres.js'

export async function load(data) {
    for (const d of data) {
        const time = await pool.query(
            "INSERT INTO dim_time(date,month,year) VALUES($1,$2,$3) RETURNING time_id",
            [d.date, new Date(d.date).getMonth() + 1, new Date(d.date).getFullYear()]
        )

        await pool.query(
            `INSERT INTO fact_sales(time_id,product_id,quantity_sold,total_amount) VALUES($1,$2,$3,$4)`,
            [time.rows[0].time_id, d.product_id, d.quantity, d.total]
        )
    }
}