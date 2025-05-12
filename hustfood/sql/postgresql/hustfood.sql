--\c postgres;

-- Đóng tất cả các kết nối đến database hustfood
--SELECT pg_terminate_backend(pid) 
--FROM pg_stat_activity 
--WHERE datname = 'hustfood' AND pid <> pg_backend_pid();

-- Xóa database cũ nếu tồn tại
DROP DATABASE IF EXISTS hustfood;

-- Tạo mới database
CREATE DATABASE hustfood ENCODING 'UTF8';

-- Kết nối đến database hustfood
\c hustfood;

-- Tạo các kiểu ENUM
CREATE TYPE user_role AS ENUM ('ADMIN', 'CUSTOMER');
CREATE TYPE user_gender AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'BANNED');

-- 1. Bảng categories
CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,
    catename VARCHAR(255),
    query VARCHAR(30),
    description TEXT
);

-- 2. Bảng users
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15),
    hashed_password VARCHAR(255),
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    status user_status NOT NULL DEFAULT 'ACTIVE',
    birthDate DATE,
    gender user_gender
);

-- 3. Bảng products
CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    category_id BIGINT CHECK(category_id BETWEEN 5 AND 8),
    category_id_combo BIGINT CHECK(category_id_combo BETWEEN 3 AND 4),
    category_id_uu_dai BIGINT CHECK(category_id_uu_dai = 1 OR category_id_uu_dai IS NULL),
    stock INT DEFAULT 0,
    sold_quantity INT DEFAULT 0,
    url_img TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- 4. Bảng orders
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    status order_status DEFAULT 'PENDING',
    total_price DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. Bảng orderdetails
CREATE TABLE orderdetails (
    order_detail_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    quantity INT DEFAULT 1,
    total_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 6. Bảng cart
CREATE TABLE cart (
    cart_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 7. Bảng inventory
CREATE TABLE inventory (
    inventory_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT,
    quantity INT DEFAULT 0,
    unit VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

ALTER TYPE user_gender RENAME VALUE 'male' TO 'MALE';
ALTER TYPE user_gender RENAME VALUE 'female' TO 'FEMALE';
ALTER TYPE user_gender RENAME VALUE 'other' TO 'OTHER';
