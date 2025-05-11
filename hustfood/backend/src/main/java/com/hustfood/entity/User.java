package com.hustfood.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

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

    @Column(name = "birthDate")
    private LocalDate birthDate;

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

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    public enum Role { USER, ADMIN }
    public enum Status { ACTIVE, BANNED }
    public enum Gender { male, female, other }
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
}