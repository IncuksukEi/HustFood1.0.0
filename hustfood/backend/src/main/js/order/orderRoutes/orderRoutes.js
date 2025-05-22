const express = require('express');
const router = express.Router();
const db = require('./orderdb');
const orderController = require('./orderController');

// CRUD cơ bản từ controller
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

// API xem chi tiết đơn hàng
router.get("/details/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const [rows] = await db.query(
      `SELECT p.product_id, p.name, od.quantity, p.price, od.quantity * p.price AS total
       FROM orderdetails od
       JOIN products p ON p.product_id = od.product_id
       WHERE od.order_id = ?`, 
      [orderId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error });
  }
});

module.exports = router;
