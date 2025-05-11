package com.hustfood.service;

import com.hustfood.dto.ProductResponseDTO;
import com.hustfood.entity.Product;
import com.hustfood.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private static final List<String> FIXED_CATEGORIES = List.of(
            "fruit", "vegetable", "drink", "meat", "rice", "noodle", "snack", "other"
    );

    public List<ProductResponseDTO> searchProducts(String query) {
        String q = query.trim().toLowerCase();
        List<Product> products;

        if (FIXED_CATEGORIES.contains(q)) {
            products = productRepository.findByCategoryNameIgnoreCase(q);
        } else {
            products = productRepository.searchProductsByKeyword(q);
        }

        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProductResponseDTO getProductDTOById(Long id) {
        return productRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + id));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + id));
        updatedProduct.setProductId(id);
        return productRepository.save(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại với ID: " + id);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getTopSellingProducts() {
        return productRepository.findTopSellingProducts();
    }

    private ProductResponseDTO toDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setUrlImg(product.getUrlImg());
        dto.setPrice(product.getPrice());
        return dto;
    }
}
