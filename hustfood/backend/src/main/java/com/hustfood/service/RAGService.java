package com.hustfood.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RAGService {
    private static final Logger logger = LoggerFactory.getLogger(RAGService.class);
    private final RestTemplate restTemplate;
    
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    @Value("${qdrant.host}")
    private String qdrantHost;
    
    @Value("${qdrant.port}")
    private int qdrantPort;
    
    private static final String COLLECTION_NAME = "hustfood";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/embeddings";
    
    public List<String> retrieveRelevantContext(String query) {
        try {
            // 1. Tối ưu query
            String optimizedQuery = optimizeQuery(query);
            logger.info("Optimized query: {}", optimizedQuery);
            
            float[] queryVector = generateEmbedding(optimizedQuery);
            
            // 2. Tìm kiếm với score threshold
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
            Map<String, Object> searchRequest = new HashMap<>();
            searchRequest.put("vector", queryVector);
            searchRequest.put("limit", 5); // Tăng số lượng kết quả
            searchRequest.put("score_threshold", 0.7); // Giảm ngưỡng để lấy nhiều kết quả hơn
            
            // 3. Thêm filter nếu cần
            if (query.toLowerCase().contains("gà rán") || query.toLowerCase().contains("gà quay")) {
                Map<String, Object> filter = new HashMap<>();
                filter.put("category_id", 5); // ID của danh mục Gà Rán - Gà Quay
                searchRequest.put("filter", filter);
            }
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(searchRequest, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(
                qdrantUrl + "/collections/" + COLLECTION_NAME + "/points/search",
                request,
                Map.class
            );
            
            // 4. Extract và format kết quả
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("result");
            return results.stream()
                .map(result -> {
                    Map<String, Object> payload = (Map<String, Object>) result.get("payload");
                    Double score = (Double) result.get("score");
                    String text = payload != null ? (String) payload.get("text") : null;
                    
                    logger.info("Retrieved chunk - Score: {}, Text: {}", score, text);
                    
                    return text;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            logger.error("Error retrieving context: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }
    
    private float[] generateEmbedding(String text) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "text-embedding-ada-002");
            requestBody.put("input", text);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_API_URL, request, Map.class);

            if (response.getBody() == null || !response.getBody().containsKey("data")) {
                throw new RuntimeException("Invalid response from OpenAI API");
            }

            List<Map<String, Object>> data = (List<Map<String, Object>>) response.getBody().get("data");
            if (data.isEmpty()) {
                throw new RuntimeException("No embedding data received");
            }

            List<Double> embedding = (List<Double>) data.get(0).get("embedding");
            float[] result = new float[embedding.size()];
            for (int i = 0; i < embedding.size(); i++) {
                result[i] = embedding.get(i).floatValue();
            }
            return result;
            
        } catch (Exception e) {
            logger.error("Error generating embedding: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate embedding", e);
        }
    }

    public void debugQdrantData() {
        try {
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
            ResponseEntity<Map> response = restTemplate.getForEntity(
                qdrantUrl + "/collections/" + COLLECTION_NAME + "/points?limit=5",
                Map.class
            );
            
            logger.info("Sample Qdrant data: {}", response.getBody());
        } catch (Exception e) {
            logger.error("Failed to get sample data: {}", e.getMessage());
        }
    }

    private String optimizeQuery(String query) {
        // Loại bỏ dấu câu và ký tự đặc biệt
        query = query.replaceAll("[^a-zA-Z0-9\\s]", "");
        
        // Chuẩn hóa khoảng trắng
        query = query.trim().replaceAll("\\s+", " ");
        
        // Chuyển về chữ thường
        query = query.toLowerCase();
        
        // Thêm từ khóa liên quan nếu cần
        if (query.contains("giá") || query.contains("bao nhiêu")) {
            query += " price cost giá tiền";
        }
        
        return query;
    }

    public String buildAugmentedPrompt(String query, List<String> contexts) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Bạn là trợ lý ảo của nhà hàng HustFood. ");
        prompt.append("Hãy trả lời CHỈ DỰA TRÊN thông tin sau đây:\n\n");
        
        if (contexts.isEmpty()) {
            prompt.append("Xin lỗi, tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn.\n");
        } else {
            prompt.append("Danh sách sản phẩm trong danh mục Gà Rán - Gà Quay:\n");
            for (String context : contexts) {
                prompt.append("- ").append(context).append("\n");
            }
        }
        
        prompt.append("\nCâu hỏi: ").append(query);
        prompt.append("\n\nLưu ý quan trọng:");
        prompt.append("\n1. Chỉ liệt kê các sản phẩm có trong thông tin được cung cấp ở trên.");
        prompt.append("\n2. Với mỗi sản phẩm, hãy nêu rõ:");
        prompt.append("\n   - Tên sản phẩm");
        prompt.append("\n   - Giá tiền");
        prompt.append("\n   - Mô tả ngắn gọn");
        prompt.append("\n3. Trả lời ngắn gọn, chính xác và bằng tiếng Việt.");
        prompt.append("\n4. Nếu có giá, hãy trả lời đúng giá như trong thông tin.");
        prompt.append("\n5. KHÔNG được thêm thông tin không có trong dữ liệu được cung cấp.");
        prompt.append("\n6. Nếu được hỏi về danh mục, chỉ liệt kê các sản phẩm có trong thông tin được cung cấp.");
        
        return prompt.toString();
    }

    private void validateData(String text, String type) {
        if (text == null || text.trim().isEmpty()) {
            logger.warn("Empty text for type: {}", type);
            return;
        }
        
        // Kiểm tra format dữ liệu
        switch (type) {
            case "product":
                validateProductData(text);
                break;
            case "order":
                validateOrderData(text);
                break;
            // ...
        }
    }

    private void validateProductData(String text) {
        if (!text.contains("Sản phẩm:") || 
            !text.contains("Giá:") || 
            !text.contains("Mô tả:") ||
            !text.contains("Danh mục:")) {
            logger.warn("Invalid product data format: {}", text);
        }
    }

    private void validateOrderData(String text) {
        if (!text.contains("Order ID:") || !text.contains("Status:")) {
            logger.warn("Invalid order data format: {}", text);
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
            
            // Thêm debug log
            debugQdrantData();
        } catch (Exception e) {
            logger.error("Qdrant health check failed: {}", e.getMessage());
        }
    }
}