package com.hustfood.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Sản phẩm không tồn tại với ID: " + id);
    }
}
