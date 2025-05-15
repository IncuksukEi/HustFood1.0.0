package com.hustfood.controller;

import com.hustfood.dto.ProductListResponse;
import com.hustfood.dto.ProductCreateRequest;
import com.hustfood.entity.Product;
import com.hustfood.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasRole('ADMIN')") // Chỉ ADMIN mới truy cập controller này
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductListResponse>> getAllProducts() {
        List<Product> products = productService.getAllProducts();

        List<ProductListResponse> result = products.stream().map(p -> {
            ProductListResponse dto = new ProductListResponse();
            dto.setProductId(p.getProductId());
            dto.setName(p.getName());
            dto.setPrice(p.getPrice());
            dto.setStock(p.getStock());
            dto.setSoldQuantity(p.getSoldQuantity());
            dto.setCategoryId(p.getCategoryId());
            dto.setUrlImg(p.getUrlImg());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductCreateRequest dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCategoryId(dto.getCategoryId());
        product.setCategory_id_uu_dai(dto.getCategory_id_uu_dai());
        product.setCategory_id_combo(dto.getCategory_id_combo());
        product.setStock(dto.getStock());
        product.setUrlImg(dto.getUrlImg());

        Product saved = productService.saveProduct(product);

        return ResponseEntity.ok().body(
                java.util.Map.of("success", true, "product_id", saved.getProductId())
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductCreateRequest dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCategoryId(dto.getCategoryId());
        product.setCategory_id_uu_dai(dto.getCategory_id_uu_dai());
        product.setCategory_id_combo(dto.getCategory_id_combo());
        product.setStock(dto.getStock());
        product.setUrlImg(dto.getUrlImg());

        productService.updateProduct(id, product);

        return ResponseEntity.ok().body(java.util.Map.of("success", true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().body(java.util.Map.of("success", true));
    }
}
