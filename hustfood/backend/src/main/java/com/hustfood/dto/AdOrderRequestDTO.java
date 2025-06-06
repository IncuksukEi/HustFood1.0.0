package com.hustfood.dto;

import lombok.Data;

import java.util.List;

import com.hustfood.entity.Order.Status;

@Data
public class AdOrderRequestDTO {
    private Long orderId; // dùng khi cập nhật
    private Long userId;
    private String phone;
    private Status status;
    private String orderAddress;
    private List<AdOrderDetailDTO> products;
}

