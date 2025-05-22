package com.hustfood.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductCreateRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private Integer stock;
    private String urlImg;
    private Long category_id_uu_dai;
    private Long category_id_combo;
}
