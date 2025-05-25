package com.hustfood.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IngredientsDTO {
    private Long ingredientId; // ✅ THÊM
    private String name;
    private String type;
    private String productName;
    private String quantity; // e.g., "15,000g"
    private int price;       // ✅ THÊM
}