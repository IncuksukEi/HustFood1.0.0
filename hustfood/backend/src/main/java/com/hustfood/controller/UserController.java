package com.hustfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hustfood.dto.UserProfileDTO;
import com.hustfood.entity.User;
import com.hustfood.service.UserService;
import com.hustfood.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Lấy thông tin profile của user hiện tại
    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getProfile(HttpServletRequest request) {
        User user = jwtUtil.extractUserFromRequest(request);
        return ResponseEntity.ok(userService.getProfile(user));
    }

    // Cập nhật thông tin người dùng (nếu field nào null thì bỏ qua)
    @PostMapping("/update")
    public ResponseEntity<Void> updateProfile(HttpServletRequest request, @RequestBody UserProfileDTO dto) {
        User user = jwtUtil.extractUserFromRequest(request);
        userService.updateUser(user, dto);
        return ResponseEntity.ok().build();
    }

    // API nội bộ - tìm theo email/phone/id (giữ lại)
    @GetMapping("/email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/phone")
    public ResponseEntity<?> getUserByPhone(@RequestParam String phone) {
        return userService.getUserByPhone(phone)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
