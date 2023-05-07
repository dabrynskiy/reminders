import { Pool } from 'pg';

export const pool = new Pool({
    user: "dabrynskiy",
    password: "",
    host: "localhost",
    port: 5432,
    database: ""
});

export default pool;