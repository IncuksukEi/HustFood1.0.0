package com.hustfood.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductCreateDTO {
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private Integer stock;
    private String urlImg;
}
