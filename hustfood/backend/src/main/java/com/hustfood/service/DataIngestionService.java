package com.hustfood.service;

import javax.annotation.PostConstruct;
import com.hustfood.entity.*;
import com.hustfood.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataIngestionService {

    private static final Logger logger = LoggerFactory.getLogger(DataIngestionService.class);
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final RestTemplate restTemplate;
    private final GeminiService geminiService;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${qdrant.host}")
    private String qdrantHost;

    @Value("${qdrant.port}")
    private int qdrantPort;

    private static final String COLLECTION_NAME = "hustfood";
    private static final int VECTOR_SIZE = 768;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    @Transactional
    public void syncDataToQdrant() {
        String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
        try {
            // 1. Xóa collection cũ
            deleteCollection(qdrantUrl);

            // 2. Tạo collection mới với cấu hình tốt hơn
            createCollectionWithConfig(qdrantUrl);

            // 3. Đồng bộ dữ liệu với validation
            syncCategories(); // ← ADD THIS LINE
            syncProducts();
            syncIngredients();
            syncOrders();

            // 4. Verify dữ liệu
            verifyData(qdrantUrl);

        } catch (Exception e) {
            logger.error("Failed to sync data: {}", e.getMessage(), e);
            throw new RuntimeException("Data sync failed", e);
        }
    }

    private void syncCategories() {
        List<Category> categories = categoryRepository.findAll();
        logger.info("Syncing {} categories to Qdrant", categories.size());

        for (Category category : categories) {
            // Create rich text description for better semantic search
            String text = String.format(
                    "=== DANH MỤC ===\n" +
                            "Tên danh mục: %s\n" +
                            "Mô tả: %s\n" +
                            "Từ khóa tìm kiếm: %s\n" +
                            "ID: %d\n" +
                            "Keywords: danh mục category loại món %s",
                    category.getCateName(),
                    category.getDescription() != null ? category.getDescription() : "Không có mô tả",
                    category.getQuery() != null ? category.getQuery() : "",
                    category.getCategoryId(),
                    category.getCateName().toLowerCase());

            float[] embedding = generateEmbedding(text);

            // Create payload with category info
            Map<String, Object> payload = new HashMap<>();
            payload.put("type", "category");
            payload.put("id", category.getCategoryId());
            payload.put("text", text);
            payload.put("name", category.getCateName());
            payload.put("description", category.getDescription());
            payload.put("query", category.getQuery());

            // Use category_id with offset to avoid ID conflicts
            // Categories: 10000 + category_id
            saveToQdrantWithPayload(10000L + category.getCategoryId(), embedding, payload);

            logger.debug("Synced category: {}", category.getCateName());
        }
        logger.info("Successfully synced {} categories", categories.size());
    }

    private void syncOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        logger.info("Syncing {} order details to Qdrant", orderDetails.size());

        for (OrderDetail detail : orderDetails) {
            String text = String.format(
                    "=== CHI TIẾT ĐƠN HÀNG ===\n" +
                            "Mã đơn hàng: %d\n" +
                            "Sản phẩm ID: %d\n" +
                            "Số lượng: %d\n" +
                            "Giá: %,.2f VNĐ",
                    detail.getOrder().getOrderId(),
                    detail.getProduct().getProductId(),
                    detail.getQuantity(),
                    detail.getTotalPrice());

            float[] embedding = generateEmbedding(text);

            Map<String, Object> payload = new HashMap<>();
            payload.put("type", "order_detail");
            payload.put("id", detail.getOrderDetailId());
            payload.put("text", text);
            payload.put("order_id", detail.getOrder().getOrderId());
            payload.put("product_id", detail.getProduct().getProductId());
            payload.put("quantity", detail.getQuantity());

            // OrderDetails: 20000 + detail_id
            saveToQdrantWithPayload(20000L + detail.getOrderDetailId(), embedding, payload);
        }
        logger.info("Successfully synced {} order details", orderDetails.size());
    }

    private void syncProducts() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            // More structured format for better retrieval
            String text = String.format(
                    "=== SẢN PHẨM ===\n" +
                            "Tên: %s\n" +
                            "Mô tả: %s\n" +
                            "Giá: %,.0f VNĐ\n" +
                            "Danh mục ID: %d\n" +
                            "Tồn kho: %d\n" +
                            "Đã bán: %d\n" +
                            "Trạng thái: %s\n" +
                            "Keywords: %s món gà món ăn thức ăn food chicken",
                    product.getName(),
                    product.getDescription() != null ? product.getDescription() : "Không có mô tả",
                    product.getPrice().doubleValue(),
                    product.getCategoryId(),
                    product.getStock(),
                    product.getSoldQuantity(),
                    product.isAvailable() ? "Còn hàng" : "Hết hàng",
                    product.getName().toLowerCase());

            float[] embedding = generateEmbedding(text);

            // Add category_id to payload for filtering
            Map<String, Object> payload = new HashMap<>();
            payload.put("type", "product");
            payload.put("id", product.getProductId());
            payload.put("text", text);
            payload.put("category_id", product.getCategoryId());
            payload.put("price", product.getPrice().doubleValue());
            payload.put("name", product.getName());

            saveToQdrantWithPayload(product.getProductId(), embedding, payload);
        }
    }

    private void createCollectionIfNotExists(String qdrantUrl) {
        Map<String, Object> vectorConfig = new HashMap<>();
        vectorConfig.put("size", VECTOR_SIZE);
        vectorConfig.put("distance", "Cosine");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("vectors", vectorConfig);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        restTemplate.put(qdrantUrl + "/collections/" + COLLECTION_NAME, request);
    }

    private float[] generateEmbedding(String text) {
        return geminiService.generateEmbedding(text);
    }

    private void saveToQdrantWithPayload(Long id, float[] embedding, Map<String, Object> payload) {
        Map<String, Object> point = new HashMap<>();
        point.put("id", id);
        point.put("vector", embedding);
        point.put("payload", payload);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("points", List.of(point));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        restTemplate.put(String.format("http://%s:%d/collections/%s/points",
                qdrantHost, qdrantPort, COLLECTION_NAME), request);
    }

    private void deleteCollection(String qdrantUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<?> request = new HttpEntity<>(headers);
            restTemplate.delete(qdrantUrl + "/collections/" + COLLECTION_NAME);
            logger.info("Deleted collection: {}", COLLECTION_NAME);
        } catch (Exception e) {
            logger.error("Failed to delete collection: {}", e.getMessage());
        }
    }

    private void createCollectionWithConfig(String qdrantUrl) {
        Map<String, Object> vectorConfig = new HashMap<>();
        vectorConfig.put("size", VECTOR_SIZE);
        vectorConfig.put("distance", "Cosine");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("vectors", vectorConfig);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        restTemplate.put(qdrantUrl + "/collections/" + COLLECTION_NAME, request);
        logger.info("Created collection with config: {}", COLLECTION_NAME);
    }

    private void verifyData(String qdrantUrl) {
        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(
                qdrantUrl + "/collections/" + COLLECTION_NAME + "/points/count",
                Map.class
            );
            logger.info("Verified data in collection: {} points", response.getBody());
        } catch (Exception e) {
            logger.error("Failed to verify data: {}", e.getMessage());
        }
    }

    private void validateData(String text, String type) {
        if (text == null || text.trim().isEmpty()) {
            logger.warn("Empty text for type: {}", type);
            return;
        }
        
        switch (type) {
            case "product":
                validateProductData(text);
                break;
            case "order":
                validateOrderData(text);
                break;
            case "ingredient":
                validateIngredientData(text);
                break;
            default:
                logger.warn("Unknown data type: {}", type);
        }
    }

    private void validateProductData(String text) {
        if (!text.contains("Price:") || !text.contains("Description:")) {
            logger.warn("Invalid product data format: {}", text);
        }
    }

    private void validateOrderData(String text) {
        if (!text.contains("Order ID:") || !text.contains("Status:")) {
            logger.warn("Invalid order data format: {}", text);
        }
    }

    private void validateIngredientData(String text) {
        if (!text.contains("Ingredient:") || !text.contains("Type:")) {
            logger.warn("Invalid ingredient data format: {}", text);
        }
    }

    private void syncIngredients() {
        List<Ingredient> ingredients = ingredientRepository.findAll();
        for (Ingredient ingredient : ingredients) {
            String text = String.format(
                    "=== NGUYÊN LIỆU ===\n" +
                            "Tên: %s\n" +
                            "Loại: %s\n" +
                            "Đơn vị: %s",
                    ingredient.getName(),
                    ingredient.getType(),
                    ingredient.getUnit());

            validateData(text, "ingredient");
            float[] embedding = generateEmbedding(text);

            // Create payload
            Map<String, Object> payload = new HashMap<>();
            payload.put("type", "ingredient");
            payload.put("id", ingredient.getIngredientId());
            payload.put("text", text);
            payload.put("name", ingredient.getName());

            saveToQdrantWithPayload(ingredient.getIngredientId(), embedding, payload);
        }
    }

    private void syncOrders() {
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            String text = String.format(
                    "=== ĐƠN HÀNG ===\n" +
                            "Mã đơn hàng: %d\n" +
                            "Trạng thái: %s\n" +
                            "Tổng giá: %,.2f VNĐ",
                    order.getOrderId(),
                    order.getStatus(),
                    order.getTotalPrice());

            validateData(text, "order");
            float[] embedding = generateEmbedding(text);

            // Create payload
            Map<String, Object> payload = new HashMap<>();
            payload.put("type", "order");
            payload.put("id", order.getOrderId());
            payload.put("text", text);
            payload.put("status", order.getStatus());
            payload.put("total_price", order.getTotalPrice());

            saveToQdrantWithPayload(order.getOrderId(), embedding, payload);
        }
    }

    // Add to DataIngestionService.java

    public Map<String, Object> getQdrantStats() {
        try {
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);

            // Get collection info
            ResponseEntity<Map> countResponse = restTemplate.getForEntity(
                    qdrantUrl + "/collections/" + COLLECTION_NAME + "/points/count",
                    Map.class);

            // Get sample points
            ResponseEntity<Map> sampleResponse = restTemplate.getForEntity(
                    qdrantUrl + "/collections/" + COLLECTION_NAME + "/points?limit=5",
                    Map.class);

            Map<String, Object> stats = new HashMap<>();
            stats.put("collection", COLLECTION_NAME);
            stats.put("count", countResponse.getBody());
            stats.put("sample_points", sampleResponse.getBody());
            stats.put("qdrant_url", qdrantUrl);

            return stats;
        } catch (Exception e) {
            logger.error("Failed to get Qdrant stats: {}", e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    @PostConstruct
    public void initializeData() {
        try {
            logger.info("Checking if Qdrant collection exists...");
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);

            ResponseEntity<Map> response = restTemplate.getForEntity(
                    qdrantUrl + "/collections/" + COLLECTION_NAME,
                    Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("Collection '{}' exists", COLLECTION_NAME);

                // Check if collection is empty
                ResponseEntity<Map> countResponse = restTemplate.getForEntity(
                        qdrantUrl + "/collections/" + COLLECTION_NAME + "/points/count",
                        Map.class);

                Map<String, Object> result = (Map<String, Object>) countResponse.getBody().get("result");
                Integer count = (Integer) result.get("count");

                if (count == 0) {
                    logger.warn("Collection is empty! Auto-syncing data...");
                    syncDataToQdrant();
                } else {
                    logger.info("Collection has {} points", count);
                }
            }
        } catch (Exception e) {
            logger.error("Failed to check/initialize collection: {}", e.getMessage());
            logger.info("Creating collection and syncing data...");
            try {
                syncDataToQdrant();
            } catch (Exception ex) {
                logger.error("Failed to sync data on startup: {}", ex.getMessage());
            }
        }
    }

    @Scheduled(fixedRate = 3600000) // Mỗi giờ
    public void monitorQdrantHealth() {
        try {
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
            ResponseEntity<Map> response = restTemplate.getForEntity(
                qdrantUrl + "/collections/" + COLLECTION_NAME + "/points/count",
                Map.class
            );
            
            logger.info("Qdrant health check: {} points in collection", response.getBody());
        } catch (Exception e) {
            logger.error("Qdrant health check failed: {}", e.getMessage());
        }
    }
} 