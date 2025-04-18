package com.hustfood.service;

import com.hustfood.entity.Product;
import com.hustfood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Lấy toàn bộ sản phẩm
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Lưu sản phẩm (thêm mới hoặc cập nhật)
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Cập nhật sản phẩm theo ID
    public Product updateProduct(Long productId, Product product) {
        Optional<Product> existingProduct = productRepository.findById(productId);
        if (existingProduct.isPresent()) {
            product.setProductId(productId);
            return productRepository.save(product);
        } else {
            throw new RuntimeException("Sản phẩm không tồn tại với ID: " + productId);
        }
    }

    // Xóa sản phẩm theo ID
    public void deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Sản phẩm không tồn tại với ID: " + productId);
        }
    }
    // Lấy thông tin sản phẩm theo ID
    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Sản phẩm không tồn tại với ID: " + productId);
        }
    }
    // Lấy sản phẩm có lượt bán cao nhất
    public List<Product> getTopSellingProducts() {
        return productRepository.findTopSellingProducts();
    }

    // Lấy N sản phẩm có rating cao nhất
    public List<Product> getTopRatedProducts(int n) {
        List<Product> products = productRepository.findTopRatedProducts();
        return products.size() > n ? products.subList(0, n) : products;
    }
}
