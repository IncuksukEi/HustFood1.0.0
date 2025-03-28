package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "replies")
@Data
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Long replyId;

    @Column(name = "feedback_id", nullable = false)
    private Long feedbackId;

    @Column(name = "admin_id", nullable = false)
    private Long adminId;

    @Column(nullable = false)
    private String message;

    @ManyToOne
    @JoinColumn(name = "feedback_id", insertable = false, updatable = false)
    private Feedback feedback;

    @ManyToOne
    @JoinColumn(name = "admin_id", insertable = false, updatable = false)
    private User admin;
}