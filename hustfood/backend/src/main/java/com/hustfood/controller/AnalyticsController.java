package com.hustfood.controller;

import com.hustfood.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@PreAuthorize("hasRole('ADMIN')")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/unique-customers")
    public ResponseEntity<Map<String, Long>> getUniqueCustomersWithReceivedOrders() {
        Long count = analyticsService.getUniqueCustomerCountWithReceivedOrders();

        Map<String, Long> response = new HashMap<>();
        response.put("customerCount", count);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/total-orders")
    public ResponseEntity<Map<String, Long>> getTotalOrders() {
        Long orderCount = analyticsService.getTotalOrderCount();

        Map<String, Long> response = new HashMap<>();
        response.put("orderCount", orderCount);

        return ResponseEntity.ok(response);
    }
}
