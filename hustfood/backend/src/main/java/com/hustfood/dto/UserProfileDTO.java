package com.hustfood.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileDTO {
    private String email;
    private String fullName;
    private String phone;
    private String gender;
    private LocalDate birthDate;
}
