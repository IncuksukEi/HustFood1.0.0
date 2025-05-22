const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const orderRoutes = require('./src/main/js/order/orderRoutes/orderRoutes');
const dashboardRoute = require ('./src/main/js/dashboard/dashboardRoute');
const app = express();
const PORT = 5000;

app.use(cors()); // Cho phép React frontend gọi API
app.use(express.json()); // Parse JSON body

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lovemyserver11@',
  database: 'hustfood',
  charset: 'utf8mb4'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('✅ Kết nối MySQL thành công!');
});

const userRoutes = require('./src/main/js/user/userRoutes');
app.use('/api/users', userRoutes);
// ==== API lấy tất cả sản phẩm ====
app.get('/api/admin/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn sản phẩm:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn database' });
    }
    res.json(results);
  });
});

// ==== API thêm sản phẩm mới ====
app.use(express.json());
app.post('/api/admin/products', (req, res) => {
  const product = req.body;
  connection.query('INSERT INTO products SET ?', product, (err, results) => {
    if (err) {
      console.error('❌ Lỗi thêm sản phẩm:', err);
      return res.status(500).json({ error: 'Lỗi thêm sản phẩm' });
    }
    res.json({ product_id: results.insertId, ...product });
  });
});

// ==== API cập nhật sản phẩm ====
app.use(express.json());
app.put('/api/admin/products/:id', (req, res) => {
  const id = req.params.id;
  const product = req.body;
  connection.query(
    'UPDATE products SET ? WHERE product_id = ?',
    [product, id],
    (err) => {
      if (err) {
        console.error('❌ Lỗi cập nhật sản phẩm:', err);
        return res.status(500).json({ error: 'Lỗi cập nhật sản phẩm' });
      }
      res.json({ product_id: id, ...product });
    }
  );
});

// ==== API xoá sản phẩm ====
app.delete('/api/admin/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id); // ép kiểu về số nguyên
  try {
    await pool.query('DELETE FROM products WHERE product_id = ?', [productId]);
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    if (error.errno === 1451) {
      res.status(400).json({ error: 'Không thể xóa sản phẩm vì đang được sử dụng trong giỏ hàng.' });
    } else {
      res.status(500).json({ error: 'Lỗi server khi xóa sản phẩm.' });
    }
  }
});


// API lấy tất cả danh mục
app.get('/api/categories', (req, res) => {
  connection.query('SELECT category_id, cate_name FROM categories', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn categories:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn danh mục' });
    }
    res.json(results);
  });
});

//Trong file API minh co
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoute);
// ==== Mặc định ====
app.get('/', (req, res) => {
  res.send('✅ API server HustFood is running');
});
app.get('/api/analytics/total-customers', (req, res) => {
  connection.query(
    'SELECT COUNT(DISTINCT user_id) AS total_customers FROM orders',
    (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn khách hàng:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn database' });
      }
      res.json(results[0]); // trả về { total_customers: x }
    }
  );
});
app.get('/api/analytics/total-orders', (req, res) => {
  connection.query(
    'SELECT COUNT(DISTINCT order_id) AS total_orders FROM orders',
    (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn tổng số đơn hàng:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn database' });
      }
      res.json(results[0]); // Trả về { total_orders: x }
    }
  );
});
app.get('/api/analytics/total-products-sold', (req, res) => {
  connection.query(
    'SELECT SUM(quantity) AS total_products_sold FROM orderdetails',
    (err, results) => {
      if (err) {
        console.error('❌ Lỗi truy vấn tổng số sản phẩm bán ra:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn database' });
      }
      res.json(results[0]); // Trả về { total_products_sold: x }
    }
  );
});
app.get('/api/analytics/customers-per-month', (req, res) => {
  const query = `
    SELECT 
      MONTH(order_date) AS month,
      COUNT(DISTINCT user_id) AS total_customers
    FROM orders
    GROUP BY MONTH(order_date)
    ORDER BY month
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn lượt khách theo tháng:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn lượt khách' });
    }
    res.json(results); // Trả về [{ month: 1, total_customers: 20 }, ...]
  });
});
app.get('/api/analytics/revenue-per-month', (req, res) => {
  const query = `
    SELECT 
      MONTH(o.order_date) AS month,
      SUM(od.total_price) AS total_revenue
    FROM orderdetails od
    JOIN orders o ON od.order_id = o.order_id
    GROUP BY MONTH(o.order_date)
    ORDER BY month
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn doanh thu theo tháng:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn doanh thu' });
    }
    res.json(results); // [{ month: 1, total_revenue: 12345 }, ...]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server backend đang chạy tại http://localhost:${PORT}`);
});
