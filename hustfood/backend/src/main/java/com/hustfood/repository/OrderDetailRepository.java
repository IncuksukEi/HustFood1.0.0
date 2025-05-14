package com.hustfood.repository;

import com.hustfood.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Query("SELECT od FROM OrderDetail od WHERE od.orderId = :orderId")
    List<OrderDetail> findByOrderId(Long orderId);

    @Query("SELECT od FROM OrderDetail od WHERE od.productId = :productId")
    List<OrderDetail> findByProductId(Long productId);
}
