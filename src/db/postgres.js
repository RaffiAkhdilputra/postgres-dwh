import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new pkg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
})