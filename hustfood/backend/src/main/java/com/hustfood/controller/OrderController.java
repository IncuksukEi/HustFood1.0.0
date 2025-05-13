package com.hustfood.controller;

import com.hustfood.dto.OrderRequestDTO;
import com.hustfood.dto.OrderResponseDTO;
import com.hustfood.service.OrderService;
import com.hustfood.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    // POST /api/orders - Tạo đơn hàng
    @PostMapping
    public ResponseEntity<Void> placeOrder(HttpServletRequest request, @RequestBody OrderRequestDTO orderRequest) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        orderService.placeOrder(userId, orderRequest);
        return ResponseEntity.ok().build();
    }

    // GET /api/orders - Lấy danh sách đơn hàng
    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        List<OrderResponseDTO> orders = orderService.getOrdersWithDetailsByUser(userId);
        return ResponseEntity.ok(orders);
    }
}
