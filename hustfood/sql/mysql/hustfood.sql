-- Xóa database cũ nếu tồn tại
DROP DATABASE IF EXISTS hustfood;

-- Tạo mới database và sử dụng
CREATE DATABASE hustfood;
USE hustfood;

-- 1. Bảng categories
CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cateName VARCHAR(255),
    query VARCHAR(30),
    description VARCHAR(255)
);

-- 2. Bảng users
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    hashed_password VARCHAR(255),
    role ENUM('ADMIN', 'CUSTOMER') NOT NULL,
    birthDate DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER')
);

-- 3. Bảng products
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10,2),
    category_id BIGINT,
	category_id_combo BIGINT,
    category_id_uu_dai BIGINT,
    stock INT,
    sold_quantity INT,
    url_img VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- 4. Bảng orders
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'),
    total_price DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. Bảng orderdetails
CREATE TABLE orderdetails (
    order_detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT,
    product_id BIGINT,
    quantity INT,
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 6. Bảng cart
CREATE TABLE cart (
    cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 7. Bảng inventory
CREATE TABLE inventory (
    inventory_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    quantity INT,
    unit VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- categories
INSERT INTO categories (cateName, query, description)
VALUES 
  ('Món chính', 'mon-chinh', 'Các món ăn chính trong bữa ăn'),
  ('Đồ uống', 'do-uong', 'Nước uống các loại'),
  ('Món tráng miệng', 'trang-mieng', 'Món ăn sau bữa chính');

-- users
INSERT INTO users (full_name, email, phone, hashed_password, role, birthDate, gender)
VALUES 
  ('Nguyen Van A', 'a@example.com', '0123456789', 'hashed123', 'CUSTOMER', '2000-01-01', 'MALE'),
  ('Tran Thi B', 'b@example.com', '0987654321', 'hashed456', 'ADMIN', '1995-05-10', 'FEMALE');

-- products
INSERT INTO products (name, description, price, category_id, category_id_combo, category_id_uu_dai, stock, sold_quantity, url_img)
VALUES 
  ('Cơm gà xối mỡ', 'Cơm với gà giòn rụm', 45000, 1, NULL, NULL, 100, 20, 'https://example.com/com-ga.jpg'),
  ('Trà đào', 'Trà đào mát lạnh', 25000, 2, NULL, NULL, 150, 40, 'https://example.com/tra-dao.jpg'),
  ('Kem vani', 'Kem mát lạnh vị vani', 30000, 3, NULL, NULL, 80, 10, 'https://example.com/kem.jpg');

-- orders
INSERT INTO orders (user_id, status, total_price)
VALUES 
  (1, 'PENDING', 70000),
  (1, 'CONFIRMED', 30000);

-- orderdetails
INSERT INTO orderdetails (order_id, product_id, quantity, total_price)
VALUES 
  (1, 1, 1, 45000),
  (1, 2, 1, 25000),
  (2, 3, 1, 30000);

-- cart
INSERT INTO cart (user_id, product_id, quantity)
VALUES 
  (1, 1, 2),
  (1, 3, 1);

-- inventory
INSERT INTO inventory (product_id, quantity, unit)
VALUES 
  (1, 200, 'Phần'),
  (2, 300, 'Ly'),
  (3, 100, 'Hộp');

