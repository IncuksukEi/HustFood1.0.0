package com.hustfood.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long orderId;
    private BigDecimal totalPrice;
    private List<OrderDetailResponseDTO> products;
}
