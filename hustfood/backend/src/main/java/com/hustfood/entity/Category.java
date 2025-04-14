package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(columnDefinition = "JSON")
    private String attributes;

    private Integer priority;

    private String value;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'")
    private Status status = Status.ACTIVE;

    @OneToMany
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private List<Product> products;

    public enum Status { ACTIVE, INACTIVE }
}