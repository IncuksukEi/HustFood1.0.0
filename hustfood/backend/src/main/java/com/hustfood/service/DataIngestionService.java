package com.hustfood.service;

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

    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value("${qdrant.host}")
    private String qdrantHost;

    @Value("${qdrant.port}")
    private int qdrantPort;

    private static final String COLLECTION_NAME = "hustfood";
    private static final int VECTOR_SIZE = 1536;
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/embeddings";

    @Transactional
    public void syncDataToQdrant() {
        String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
        try {
            // 1. Xóa collection cũ
            deleteCollection(qdrantUrl);
            
            // 2. Tạo collection mới với cấu hình tốt hơn
            createCollectionWithConfig(qdrantUrl);
            
            // 3. Đồng bộ dữ liệu với validation
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

    private void syncProducts() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            // Format dữ liệu chi tiết và rõ ràng hơn
            String text = String.format(
                "Sản phẩm: %s\n" +
                "Mô tả: %s\n" +
                "Giá: %,.0f VNĐ\n" +
                "Danh mục ID: %d\n" +
                "Danh mục Combo ID: %d\n" +
                "Danh mục Ưu đãi ID: %s\n" +
                "Số lượng tồn kho: %d\n" +
                "Số lượng đã bán: %d\n" +
                "Trạng thái: %s",
                product.getName(),
                product.getDescription(),
                product.getPrice().doubleValue(),
                product.getCategoryId(),
                product.getCategory_id_combo(),
                product.getCategory_id_uu_dai(),
                product.getStock(),
                product.getSoldQuantity(),
                product.isAvailable() ? "Còn hàng" : "Hết hàng"
            );
            
            validateData(text, "product");
            float[] embedding = generateEmbedding(text);
            saveToQdrant("product", product.getProductId(), embedding, text);
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
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "text-embedding-ada-002");
        requestBody.put("input", text);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);

        List<Map<String, Object>> data = (List<Map<String, Object>>) response.getBody().get("data");
        List<Double> embedding = (List<Double>) data.get(0).get("embedding");
        float[] result = new float[embedding.size()];
        for (int i = 0; i < embedding.size(); i++) {
            result[i] = embedding.get(i).floatValue();
        }
        return result;
    }

    private void saveToQdrant(String type, Long id, float[] embedding, String text) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("type", type);
        payload.put("id", id);
        payload.put("text", text);

        Map<String, Object> point = new HashMap<>();
        point.put("id", id);
        point.put("vector", embedding);
        point.put("payload", payload);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("points", List.of(point));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        restTemplate.put(String.format("http://%s:%d/collections/%s/points", qdrantHost, qdrantPort, COLLECTION_NAME), request);
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
                "Ingredient: %s\nType: %s\nUnit: %s",
                ingredient.getName(),
                ingredient.getType(),
                ingredient.getUnit()
            );
            
            validateData(text, "ingredient");
            float[] embedding = generateEmbedding(text);
            saveToQdrant("ingredient", ingredient.getIngredientId(), embedding, text);
        }
    }

    private void syncOrders() {
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            String text = String.format(
                "Order ID: %d\nStatus: %s\nTotal Price: %.2f",
                order.getOrderId(),
                order.getStatus(),
                order.getTotalPrice()
            );
            
            validateData(text, "order");
            float[] embedding = generateEmbedding(text);
            saveToQdrant("order", order.getOrderId(), embedding, text);
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