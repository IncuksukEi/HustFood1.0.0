package com.hustfood.repository;

import com.hustfood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // JPQL truy vấn lấy sản phẩm có lượt bán cao nhất
    @Query("SELECT p FROM Product p ORDER BY p.soldQuantity DESC")
    List<Product> findTopSellingProducts();

    // JPQL truy vấn lấy 2 sản phẩm có rating cao nhất
    @Query("SELECT p FROM Product p ORDER BY p.rating DESC")
    List<Product> findTopRatedProducts();
}