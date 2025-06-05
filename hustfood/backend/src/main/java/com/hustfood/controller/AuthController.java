package com.hustfood.controller;

import com.hustfood.dto.*;
import com.hustfood.entity.User;
import com.hustfood.repository.UserRepository;
import com.hustfood.security.TokenBlacklistService;
import com.hustfood.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        User user = userRepository.findByEmail(request.getEmail()).get();
        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng");
        }

        User user = userOpt.get();

        if (!user.getRole().name().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản không có quyền ADMIN");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()
        );

        try {
            authManager.authenticate(authentication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng");
        }

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(409)
                    .body(Map.of(
                            "errorCode", "EMAIL_EXISTS",
                            "message", "Email already in use"
                    ));
        }

        if (userRepository.existsByPhone(req.getPhone())) {
            return ResponseEntity.status(422)
                    .body(Map.of(
                            "errorCode", "PHONE_EXISTS",
                            "message", "Phone number already in use"
                    ));
        }

        User newUser = new User();
        newUser.setFullName(req.getFullName());
        newUser.setEmail(req.getEmail());
        newUser.setPhone(req.getPhone());
        newUser.setHashedPassword(passwordEncoder.encode(req.getPassword()));
        newUser.setRole(User.Role.CUSTOMER);
        newUser.setGender(User.Gender.OTHER);

        userRepository.save(newUser);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registration successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Missing token");
        }

        String token = authHeader.substring(7);
        tokenBlacklistService.blacklistToken(token);
        return ResponseEntity.ok("Logged out successfully");
    }
}