package com.hustfood.service;

import com.hustfood.dto.UserProfileDTO;
import com.hustfood.entity.User;
import com.hustfood.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public UserProfileDTO getProfile(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setPhone(user.getPhone());
        dto.setGender(user.getGender().name());
        dto.setBirthDate(user.getBirthDate());
        return dto;
    }

    public void updateUser(User user, UserProfileDTO dto) {
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getGender() != null) user.setGender(User.Gender.valueOf(dto.getGender()));
        if (dto.getBirthDate() != null) user.setBirthDate(dto.getBirthDate());
        userRepository.save(user);
    }
}
