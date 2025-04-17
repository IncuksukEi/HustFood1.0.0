package com.hustfood.controller;

import com.hustfood.entity.Product;
import com.hustfood.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Lấy toàn bộ sản phẩm
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Thêm sản phẩm
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Cập nhật sản phẩm theo ID
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Xóa sản phẩm theo ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
    // Lấy thông tin sản phẩm theo ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    // Lấy sản phẩm có lượt bán cao nhất
    @GetMapping("/top-selling")
    public List<Product> getTopSellingProducts() {
        return productService.getTopSellingProducts();
    }
    // Lấy N sản phẩm có rating cao nhất
    @GetMapping("/top-rated")
    public List<Product> getTopRatedProducts(@RequestParam(value = "n", defaultValue = "2", required = false) int n) {
        return productService.getTopRatedProducts(n);
    }
}
