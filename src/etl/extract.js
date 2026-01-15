import { pool } from '../db/postgres.js'

export async function extract() {
    const res = await pool.query("SELECT * FROM tansaction")
    return res.rows
}