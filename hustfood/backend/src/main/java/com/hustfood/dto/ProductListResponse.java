package com.hustfood.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductListResponse {
    private Long productId;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private Integer soldQuantity;
    private Long categoryId;
    private String urlImg;
}
