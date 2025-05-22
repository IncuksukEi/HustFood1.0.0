const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lovemyserver11@',
  database: 'hustfood'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Kết nối thành công MySQL');
});

module.exports = db.promise(); // ⚠️ QUAN TRỌNG: export db.promise()
