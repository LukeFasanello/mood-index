const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'lukefasanello',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'moodindex',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;