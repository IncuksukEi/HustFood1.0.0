INSERT INTO orderdetails (order_detail_id, order_id, product_id, quantity, total_price)
VALUES
    -- Order 1: 2 products
    (1, 1, 3, 2, 90000),  -- Cơm phi lê gà x2
    (2, 1, 7, 1, 25000),  -- Khoai tây múi cau x1

    -- Order 2: 3 products
    (3, 2, 1, 3, 135000), -- Cơm gà x3
    (4, 2, 5, 2, 60000),  -- Gà viên x2
    (5, 2, 11, 4, 100000), -- Salad hạt x4

    -- Order 3: 1 product
    (6, 3, 13, 3, 207000), -- Ba Miếng Gà Không Xương x3

    -- Order 4: 4 products
    (7, 4, 2, 2, 90000),   -- Cơm gà rán x2
    (8, 4, 6, 3, 60000),   -- Khoai tây chiên x3
    (9, 4, 9, 1, 40000),   -- Mỳ Ý x1
    (10, 4, 15, 4, 120000), -- Burger Gà x4

    -- Order 5: 2 products
    (11, 5, 4, 3, 105000), -- 1 Miếng Gà Rán x3
    (12, 5, 8, 2, 50000),  -- Khoai tây nghiền x2

    -- Order 6: 3 products
    (13, 6, 10, 4, 120000), -- Phô mai viên x4
    (14, 6, 12, 1, 60000),  -- Ba cánh gà x1
    (15, 6, 14, 2, 30000),  -- Bắp cải trộn x2

    -- Order 7: 2 products
    (16, 7, 16, 3, 174000), -- Hai Miếng Gà Rán x3
    (17, 7, 11, 2, 50000),  -- Salad hạt x2

    -- Order 8: 5 products
    (18, 8, 1, 1, 45000),   -- Cơm gà x1
    (19, 8, 5, 2, 60000),   -- Gà viên x2
    (20, 8, 7, 4, 100000),  -- Khoai tây múi cau x4
    (21, 8, 13, 1, 69000),  -- Ba Miếng Gà Không Xương x1
    (22, 8, 15, 2, 60000),  -- Burger Gà x2

    -- Order 9: 3 products
    (23, 9, 3, 4, 180000),  -- Cơm phi lê gà x4
    (24, 9, 8, 3, 75000),   -- Khoai tây nghiền x3
    (25, 9, 14, 1, 15000),  -- Bắp cải trộn x1

    -- Order 10: 4 products
    (26, 10, 2, 2, 90000),  -- Cơm gà rán x2
    (27, 10, 6, 3, 60000),  -- Khoai tây chiên x3
    (28, 10, 9, 4, 160000), -- Mỳ Ý x4
    (29, 10, 12, 1, 60000), -- Ba cánh gà x1

    -- Continue pattern for orders 11-20...
    -- Order 11: 3 products
    (30, 11, 4, 2, 70000),   -- 1 Miếng Gà Rán x2
    (31, 11, 10, 3, 90000),  -- Phô mai viên x3
    (32, 11, 16, 4, 232000), -- Hai Miếng Gà Rán x4

    -- Order 12: 2 products
    (33, 12, 5, 3, 90000),   -- Gà viên x3
    (34, 12, 13, 2, 138000), -- Ba Miếng Gà Không Xương x2

    -- Order 13: 4 products
    (35, 13, 1, 2, 90000),   -- Cơm gà x2
    (36, 13, 7, 4, 100000),  -- Khoai tây múi cau x4
    (37, 13, 11, 1, 25000),  -- Salad hạt x1
    (38, 13, 15, 3, 90000),  -- Burger Gà x3

    -- Order 14: 3 products
    (39, 14, 3, 2, 90000),   -- Cơm phi lê gà x2
    (40, 14, 8, 4, 100000),  -- Khoai tây nghiền x4
    (41, 14, 12, 3, 180000), -- Ba cánh gà x3

    -- Order 15: 2 products
    (42, 15, 6, 3, 60000),   -- Khoai tây chiên x3
    (43, 15, 14, 2, 30000),  -- Bắp cải trộn x2

    -- Order 16: 5 products
    (44, 16, 2, 1, 45000),   -- Cơm gà rán x1
    (45, 16, 4, 2, 70000),   -- 1 Miếng Gà Rán x2
    (46, 16, 9, 3, 120000),  -- Mỳ Ý x3
    (47, 16, 13, 4, 276000), -- Ba Miếng Gà Không Xương x4
    (48, 16, 16, 1, 58000),  -- Hai Miếng Gà Rán x1

    -- Order 17: 3 products
    (49, 17, 5, 2, 60000),   -- Gà viên x2
    (50, 17, 10, 4, 120000), -- Phô mai viên x4
    (51, 17, 15, 3, 90000),  -- Burger Gà x3

    -- Order 18: 1 product
    (52, 18, 1, 4, 180000),  -- Cơm gà x4

    -- Order 19: 4 products
    (53, 19, 3, 2, 90000),   -- Cơm phi lê gà x2
    (54, 19, 7, 1, 25000),   -- Khoai tây múi cau x1
    (55, 19, 11, 3, 75000),  -- Salad hạt x3
    (56, 19, 14, 4, 60000),  -- Bắp cải trộn x4

    -- Order 20: 3 products
    (57, 20, 6, 2, 40000),   -- Khoai tây chiên x2
    (58, 20, 8, 3, 75000),   -- Khoai tây nghiền x3
    (59, 20, 12, 1, 60000);  -- Ba cánh gà x1
