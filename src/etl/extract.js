import { pool } from "../db/postgres.js"

export async function extract() {
    const query = `
        SELECT
            transaction_id,
            transaction_date,
            product_id,
            customer_id,
            quantity
        FROM transactions
    `

    const { rows } = await pool.query(query)
    return rows
}
