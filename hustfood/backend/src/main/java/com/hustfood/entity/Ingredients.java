package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ingredients")
@Data
public class Ingredients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId;

    private String name;
    private String type;
    private int quantity;
    private String unit;
    private int price;

    @Column(name = "product_id")
    private Long productId;
}
