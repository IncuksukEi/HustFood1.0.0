package com.hustfood.controller;

import com.hustfood.entity.Order;
import com.hustfood.service.OrderService;
import com.hustfood.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    // POST /api/orders - Tạo đơn hàng
    @PostMapping
    public ResponseEntity<Void> placeOrder(HttpServletRequest request, @RequestBody List<Map<String, Object>> items) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        orderService.placeOrder(userId, items);
        return ResponseEntity.ok().build();
    }

    // GET /api/orders - Lấy tất cả đơn hàng theo user
    @GetMapping
    public ResponseEntity<List<Order>> getOrders(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        List<Order> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }
}
