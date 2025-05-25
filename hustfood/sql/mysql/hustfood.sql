-- Xóa database cũ nếu tồn tại
DROP DATABASE IF EXISTS hustfood;

-- Tạo mới database và sử dụng
CREATE DATABASE hustfood;
USE hustfood;

-- 1. Bảng categories
CREATE TABLE if not exists categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cate_name VARCHAR(255),
    query VARCHAR(30),
    description VARCHAR(255)
);

-- 2. Bảng users
CREATE TABLE if not exists users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15) UNIQUE,
    hashed_password VARCHAR(255),
    role ENUM('ADMIN', 'CUSTOMER') NOT NULL,
    birth_date DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    address VARCHAR(255)
);

-- 3. Bảng products
CREATE TABLE if not exists products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10,2),
    category_id BIGINT ChECK(category_id BETWEEN 5 AND 8),
	category_id_combo BIGINT CHECK(category_id_combo BETWEEN 3 AND 4),
    category_id_uu_dai BIGINT CHECK(category_id_uu_dai = 1 OR category_id_uu_dai IS NULL),
    stock INT,
    sold_quantity INT,
    url_img VARCHAR(255)
);

-- 4. Bảng orders
CREATE TABLE if not exists orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED', 'RECEIVED'),
    total_price DECIMAL(10,2),
    order_address VARCHAR(255),
    order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. Bảng orderdetails
CREATE TABLE if not exists orderdetails (
    order_detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT,
    product_id BIGINT,
    quantity INT,
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 6. Bảng cart
CREATE TABLE if not exists cart (
    cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- 7. Bảng inventory
CREATE TABLE if not exists inventory (
    inventory_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    quantity INT,
    unit VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- 8. Bảng ingredients (nguyên liệu)
CREATE TABLE if not exists ingredients (
    ingredient_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    name VARCHAR(100),
    quantity DECIMAL(10,2),
    unit VARCHAR(20),
    type VARCHAR(50),
    price DECIMAL(10,2),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
