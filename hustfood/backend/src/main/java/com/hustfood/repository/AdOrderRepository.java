package com.hustfood.repository;

import com.hustfood.entity.Order;
import com.hustfood.entity.Product;
import com.hustfood.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdOrderRepository extends JpaRepository<Order, Long> {
}
