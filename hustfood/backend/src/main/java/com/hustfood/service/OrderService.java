package com.hustfood.service;

import com.hustfood.dto.ProductSalesDTO;
import com.hustfood.entity.*;
import com.hustfood.repository.*;

import jakarta.transaction.Transactional;

import com.hustfood.dto.OrderResponseDTO;
import com.hustfood.dto.OrderDetailResponseDTO;
import com.hustfood.dto.OrderRequestDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    public void placeOrder(Long userId, OrderRequestDTO orderRequest) {
        if (orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            throw new IllegalStateException("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
        }

        BigDecimal total = BigDecimal.ZERO;
        List<OrderDetail> detailList = new ArrayList<>();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));

        // Lấy địa chỉ từ request nếu có, ngược lại dùng địa chỉ của user
        String orderAddress = (orderRequest.getAddress() != null && !orderRequest.getAddress().trim().isEmpty())
                ? orderRequest.getAddress()
                : user.getAddress();

        Order order = new Order();
        order.setUserId(userId);
        order.setOrderAddress(orderAddress);
        // KHÔNG set orderTime — để DB tự xử lý

        for (OrderRequestDTO.OrderItemDTO item : orderRequest.getItems()) {
            Long productId = item.getProductId();
            Integer quantity = item.getQuantity();

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

            dto.setOrderAddress(order.getOrderAddress());
            dto.setOrderTime(order.getOrderTime());
            dto.setStatus(order.getStatus().name());

            List<OrderDetailResponseDTO> productList = new ArrayList<>();

            for (OrderDetail detail : order.getOrderDetails()) {
                Product product = detail.getProduct();

                OrderDetailResponseDTO pDto = new OrderDetailResponseDTO();
                pDto.setName(product.getName());
                pDto.setDescription(product.getDescription());
                pDto.setUrlImg(product.getUrlImg());
                pDto.setPrice(product.getPrice().multiply(BigDecimal.valueOf(detail.getQuantity())));
                pDto.setQuantity(detail.getQuantity());

                productList.add(pDto);
            }

            dto.setProducts(productList);
            result.add(dto);
        }

        return result;
    }
    // Lọc tổng số tiền nhận được
    public BigDecimal getTotalRevenue() {
        return orderRepository.getTotalRevenue();
    }
    // Lọc tổng số tiền đơn hàng bị hủy
    public Map<String, Object> getCancelledOrdersStats() {
        Object[] result = orderRepository.getCancelledOrdersStats();
        Long totalCancelledOrders = (Long) result[0];
        BigDecimal cancelledValue = (BigDecimal) result[1];

        Map<String, Object> response = new HashMap<>();
        response.put("totalCancelledOrders", totalCancelledOrders);
        response.put("cancelledValue", cancelledValue);
        return response;
    }
    // Doanh thu combo
    public BigDecimal getComboRevenue() {
        return orderDetailRepository.getComboRevenue();
    }
    // Sản phẩm kèm theo doanh thu
    public List<ProductSalesDTO> getProductSalesReport() {
        return orderDetailRepository.getProductSalesReport();
    }
}