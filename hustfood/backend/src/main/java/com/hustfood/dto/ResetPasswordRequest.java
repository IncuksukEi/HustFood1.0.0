package com.hustfood.dto;

public class ResetPasswordRequest {

    private String password;
    private String newPassword;

    // Getters và Setters
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
