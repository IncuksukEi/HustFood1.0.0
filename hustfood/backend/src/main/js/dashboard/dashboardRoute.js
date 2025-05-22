const express = require('express');
const pool = require('./dashboarddb'); // Giữ nguyên, không cần thêm .js nếu dùng CommonJS
const router = express.Router();

// 1. Tổng doanh thu
router.get('/revenue', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT SUM(total_price) AS revenue FROM orderdetails');
    res.json({ revenue: rows[0].revenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Doanh thu đơn hủy
router.get('/cancelled_orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT SUM(od.total_price) AS cancelledRevenue
      FROM orderdetails od
      JOIN orders o ON od.order_id = o.order_id
      WHERE o.status = 'CANCELLED'
    `);
    res.json({ cancelledRevenue: rows[0].cancelledRevenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Doanh thu combo
router.get('/combo_orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT SUM(od.total_price) AS comboRevenue
      FROM orderdetails od
      JOIN products p ON od.product_id = p.product_id
      WHERE p.category_id_combo IN (3, 4)
    `);
    res.json({ comboRevenue: rows[0].comboRevenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 1: Tỉ lệ đơn hàng bị hủy
router.get('/cancelled_rate', async (req, res) => {
  try {
    const [cancelled] = await pool.query(`SELECT COUNT(*) AS cancelled FROM orders WHERE status = 'CANCELLED'`);
    const [total] = await pool.query(`SELECT COUNT(*) AS total FROM orders`);

    const cancelledCount = cancelled[0].cancelled || 0;
    const totalCount = total[0].total || 1; // Tránh chia cho 0

    const rate = (cancelledCount / totalCount) * 100;

    res.json({ cancelledRate: rate.toFixed(2) }); // Trả về % với 2 chữ số thập phân
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 2: Danh sách doanh thu từng sản phẩm
router.get('/get_products_revenue', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.name, SUM(od.total_price) AS total_price
      FROM orderdetails od
      JOIN products p ON od.product_id = p.product_id
      GROUP BY od.product_id, p.name
      ORDER BY total_price DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
