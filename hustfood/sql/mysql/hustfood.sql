DROP DATABASE IF EXISTS hustfood;
CREATE DATABASE hustfood CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hustfood;

-- Create tables
CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    catename VARCHAR(255),
    description TEXT,
    query VARCHAR(30)
);

CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15),
    hashed_password VARCHAR(255),
    role ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    birthDate DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER')
);

CREATE TABLE products (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    category_id BIGINT,
    -- Should be between 5 and 8
    category_id_combo BIGINT,
    -- Should be between 3 and 4
    category_id_uu_dai BIGINT,
    -- Should be 1 or NULL
    stock INT DEFAULT 0,
    sold_quantity INT DEFAULT 0,
    url_img TEXT
);

CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED') DEFAULT 'PENDING',
    total_price DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE orderdetails (
    order_detail_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    quantity INT DEFAULT 1,
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE cart (
    cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE inventory (
    inventory_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    quantity INT DEFAULT 0,
    unit VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
