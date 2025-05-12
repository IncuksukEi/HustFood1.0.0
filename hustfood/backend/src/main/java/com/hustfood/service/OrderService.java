package com.hustfood.service;

import com.hustfood.entity.*;
import com.hustfood.repository.*;
import com.hustfood.dto.OrderResponseDTO;
import com.hustfood.dto.OrderDetailResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    public void placeOrder(Long userId, List<Map<String, Object>> items) {
        BigDecimal total = BigDecimal.ZERO;
        List<OrderDetail> detailList = new ArrayList<>();

        // Tạo Order
        Order order = new Order();
        order.setUserId(userId);

        for (Map<String, Object> item : items) {
            Long productId = Long.valueOf(item.get("product_id").toString());
            Integer quantity = Integer.valueOf(item.get("quantity").toString());

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + productId));

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(quantity));
            total = total.add(itemTotal);

            OrderDetail detail = new OrderDetail();
            detail.setProductId(productId);
            detail.setQuantity(quantity);
            detail.setTotalPrice(itemTotal);
            detailList.add(detail);
        }

        order.setTotalPrice(total);
        Order savedOrder = orderRepository.save(order);

        for (OrderDetail detail : detailList) {
            detail.setOrderId(savedOrder.getOrderId());
            orderDetailRepository.save(detail);
        }

        // Xoá giỏ hàng
        cartRepository.deleteByUserId(userId);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<OrderResponseDTO> getOrdersWithDetailsByUser(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderResponseDTO> result = new ArrayList<>();

        for (Order order : orders) {
            OrderResponseDTO dto = new OrderResponseDTO();
            dto.setOrderId(order.getOrderId());
            dto.setTotalPrice(order.getTotalPrice());

            List<OrderDetailResponseDTO> productList = new ArrayList<>();

            for (OrderDetail detail : order.getOrderDetails()) {
                Product product = detail.getProduct();

                OrderDetailResponseDTO pDto = new OrderDetailResponseDTO();
                pDto.setName(product.getName());
                pDto.setDescription(product.getDescription());
                pDto.setUrlImg(product.getUrlImg());
                pDto.setPrice(product.getPrice());
                pDto.setQuantity(detail.getQuantity());

                productList.add(pDto);
            }

            dto.setProducts(productList);
            result.add(dto);
        }

        return result;
    }
}
