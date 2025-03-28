package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED') DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @OneToMany(mappedBy = "orderId")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "orderId")
    private List<Payment> payments;

    public enum Status { PENDING, CONFIRMED, SHIPPED, CANCELLED }
}