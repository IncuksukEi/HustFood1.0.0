package com.hustfood.repository;

import com.hustfood.entity.Product;
import com.hustfood.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name); // <- Dòng mới thêm
}
