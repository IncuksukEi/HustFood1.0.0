package com.hustfood.controller;

import com.hustfood.dto.*;
import com.hustfood.entity.User;
import com.hustfood.repository.UserRepository;
import com.hustfood.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
        }

        User newUser = new User();
        newUser.setFullName(req.getFullName());
        newUser.setEmail(req.getEmail());
        newUser.setPhone(req.getPhone());
        newUser.setHashedPassword(passwordEncoder.encode(req.getPassword()));
        newUser.setRole(User.Role.CUSTOMER); // set mặc định
        newUser.setStatus(User.Status.ACTIVE); // set mặc định
        newUser.setGender(User.Gender.OTHER); // set mặc định

        userRepository.save(newUser);

        // Nếu muốn gửi token sau khi đăng ký:
        String token = jwtUtil.generateToken(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new LoginResponse(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT là stateless nên không cần xử lý nhiều
        return ResponseEntity.ok().build();
    }
}
