import pg from 'pg';

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'mini_dwh',
    port: 5432,
});

const test = async () => {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows);
    process.exit();
};

test();
