const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lovemyserver11@',
  database: 'hustfood',
});
module.exports = pool;
