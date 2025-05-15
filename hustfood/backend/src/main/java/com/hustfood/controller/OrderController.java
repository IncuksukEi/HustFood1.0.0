package com.hustfood.controller;

import com.hustfood.dto.OrderRequestDTO;
import com.hustfood.dto.OrderResponseDTO;
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
    public ResponseEntity<?> placeOrder(HttpServletRequest request, @RequestBody OrderRequestDTO orderRequest) {
        Long userId = jwtUtil.getUserIdFromRequest(request);

        try {
            orderService.placeOrder(userId, orderRequest);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(HttpServletRequest request) {
        Long userId = jwtUtil.getUserIdFromRequest(request);
        List<OrderResponseDTO> orders = orderService.getOrdersWithDetailsByUser(userId);
        return ResponseEntity.ok(orders);
    }
}