const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lovemyserver11@',
  database: 'hustfood',
  charset: 'utf8mb4'
});

module.exports = db;
