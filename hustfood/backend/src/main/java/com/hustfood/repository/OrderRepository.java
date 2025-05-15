package com.hustfood.repository;

import com.hustfood.entity.Order;
import com.hustfood.entity.Order.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM orders WHERE user_id = ?1 ORDER BY order_id DESC", nativeQuery = true)
    List<Order> findByUserId(@Param("userId") Long userId);

    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByStatus(@Param("status") Status status);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.status <> 'CANCELLED'")
    BigDecimal getTotalRevenue();

    @Query("SELECT COUNT(o), COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.status = com.hustfood.entity.Order.Status.CANCELLED")
    Object[] getCancelledOrdersStats();

}
