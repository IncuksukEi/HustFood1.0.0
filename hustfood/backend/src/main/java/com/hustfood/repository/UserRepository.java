package com.hustfood.repository;

import com.hustfood.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Tìm người dùng theo email sử dụng @Query
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);

    // Tìm người dùng theo phone sử dụng @Query
    @Query("SELECT u FROM User u WHERE u.phone = :phone")
    Optional<User> findByPhone(String phone);

    // Tìm người dùng theo id
    @Query("SELECT u FROM User u WHERE u.userId = :id")
    Optional<User> findById(Long id);
    
}
