package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'DIRECT_PAYMENT')")
    private Method method;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Order order;

    public enum Method { CASH, CREDIT_CARD, BANK_TRANSFER, DIRECT_PAYMENT }
    public enum Status { PENDING, COMPLETED, FAILED }
}