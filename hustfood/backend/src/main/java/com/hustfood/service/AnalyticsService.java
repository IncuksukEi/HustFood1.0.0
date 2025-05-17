package com.hustfood.service;

import com.hustfood.repository.OrderDetailRepository;
import com.hustfood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    public AnalyticsService(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    public Long getUniqueCustomerCountWithReceivedOrders() {
        return orderRepository.countDistinctUsersWithReceivedOrders();
    }

    public Long getTotalOrderCount() {
        return orderDetailRepository.count();
    }
}
