const express = require('express');
const router = express.Router();
const db = require('./userdb'); // Cập nhật đúng đường dẫn tới kết nối MySQL

// API GET /api/users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT user_id, full_name FROM users");
    res.json(rows);
  } catch (err) {
    console.error('❌ Lỗi lấy users:', err);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
  }
});
router.post('/', (req, res) => {
  const { full_name } = req.body;
  if (!full_name) return res.status(400).json({ error: 'Tên không được bỏ trống' });

  const query = 'INSERT INTO users (full_name) VALUES (?)';
  connection.query(query, [full_name], (err, results) => {
    if (err) {
      console.error('Lỗi khi thêm khách hàng:', err);
      return res.status(500).json({ error: 'Lỗi khi thêm khách hàng' });
    }
    res.status(201).json({ user_id: results.insertId, full_name });
  });
});
module.exports = router;
