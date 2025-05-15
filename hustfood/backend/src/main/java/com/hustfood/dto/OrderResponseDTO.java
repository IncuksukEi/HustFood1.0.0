package com.hustfood.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long orderId;
    private BigDecimal totalPrice;
    private String orderAddress;
    private LocalDateTime orderTime;
    private String status;
    private List<OrderDetailResponseDTO> products;
}
