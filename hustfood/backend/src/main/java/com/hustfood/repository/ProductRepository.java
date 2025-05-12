package com.hustfood.repository;

import com.hustfood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN p.category c WHERE LOWER(c.query) = LOWER(:query)")
    List<Product> findByCategoryQuery(String query);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE %:keyword% OR LOWER(p.description) LIKE %:keyword%")
    List<Product> searchProductsByKeyword(String keyword);

    @Query("SELECT p FROM Product p ORDER BY p.soldQuantity DESC")
    List<Product> findTopSellingProducts();
}
