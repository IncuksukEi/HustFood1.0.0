const db = require('./orderdb');

exports.getAllOrders = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT o.*, u.full_name 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.user_id
    `);
    res.json(results);
  } catch (err) {
    console.error("Lỗi SQL:", err); // 👈 Thêm dòng này
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: err });
  }
};

exports.createOrder = async (req, res) => {
  const { user_id, status, total_price } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO orders (user_id, status, total_price) VALUES (?, ?, ?)`,
      [user_id, status, total_price]
    );
    res.json({ order_id: result.insertId });
  } catch (err) {
    console.error("Lỗi SQL:", err); // 👈 Thêm dòng này
    res.status(500).json({ message: "Lỗi khi thêm đơn hàng", error: err });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id, status, total_price } = req.body;
  try {
    await db.query(
      `UPDATE orders SET user_id = ?, status = ?, total_price = ? WHERE order_id = ?`,
      [user_id, status, total_price, id]
    );
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    console.error("Lỗi SQL:", err); // 👈 Thêm dòng này
    res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error: err });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM orders WHERE order_id = ?`, [id]);
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error("Lỗi SQL:", err); // 👈 Thêm dòng này
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error: err });
  }
};
