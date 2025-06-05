package com.hustfood.service;

import com.hustfood.entity.*;
import com.hustfood.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataIngestionService {

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
            // Create collection if not exists
            createCollectionIfNotExists(qdrantUrl);

            // Sync products
            List<Product> products = productRepository.findAll();
            for (Product product : products) {
                String text = String.format("Product: %s, Description: %s, Price: %.2f",
                    product.getName(), product.getDescription(), product.getPrice());
                float[] embedding = generateEmbedding(text);
                saveToQdrant(qdrantUrl, "product", product.getProductId(), embedding, text);
            }

            // Sync ingredients
            List<Ingredient> ingredients = ingredientRepository.findAll();
            for (Ingredient ingredient : ingredients) {
                String text = String.format("Ingredient: %s, Type: %s, Unit: %s",
                    ingredient.getName(), ingredient.getType(), ingredient.getUnit());
                float[] embedding = generateEmbedding(text);
                saveToQdrant(qdrantUrl, "ingredient", ingredient.getIngredientId(), embedding, text);
            }

            // Sync orders
            List<Order> orders = orderRepository.findAll();
            for (Order order : orders) {
                String text = String.format("Order ID: %d, Status: %s, Total Price: %.2f",
                    order.getOrderId(), order.getStatus(), order.getTotalPrice());
                float[] embedding = generateEmbedding(text);
                saveToQdrant(qdrantUrl, "order", order.getOrderId(), embedding, text);
            }

            // Sync order details
            List<OrderDetail> orderDetails = orderDetailRepository.findAll();
            for (OrderDetail detail : orderDetails) {
                String text = String.format("Order Detail: Product %s, Quantity: %d, Total Price: %.2f",
                    detail.getProduct().getName(), detail.getQuantity(), detail.getTotalPrice());
                float[] embedding = generateEmbedding(text);
                saveToQdrant(qdrantUrl, "order_detail", detail.getOrderDetailId(), embedding, text);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to sync data to Qdrant", e);
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

    private void saveToQdrant(String qdrantUrl, String type, Long id, float[] embedding, String text) {
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
        restTemplate.put(qdrantUrl + "/collections/" + COLLECTION_NAME + "/points", request);
    }
} 