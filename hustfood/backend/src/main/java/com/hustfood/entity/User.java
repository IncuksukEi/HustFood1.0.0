package com.hustfood.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('USER', 'ADMIN') DEFAULT 'USER'")
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE', 'BANNED') DEFAULT 'ACTIVE'")
    private Status status = Status.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('male', 'female', 'other') DEFAULT 'other'")
    private Gender gender;
/*
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<Feedback> feedbacks;
*/
    public enum Role { USER, ADMIN }
    public enum Status { ACTIVE, BANNED }
    public enum Gender { male, female, other }
}