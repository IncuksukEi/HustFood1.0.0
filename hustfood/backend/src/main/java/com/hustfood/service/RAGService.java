package com.hustfood.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RAGService {
    private static final Logger logger = LoggerFactory.getLogger(RAGService.class);
    private final RestTemplate restTemplate;
    private final GeminiService geminiService;

    @Value("${qdrant.host}")
    private String qdrantHost;

    @Value("${qdrant.port}")
    private int qdrantPort;

    @Value("${qdrant.collection.name}")
    private String collectionName;

    @Value("${qdrant.score.threshold}")
    private double scoreThreshold;

    @Value("${qdrant.search.limit}")
    private int searchLimit;

    /**
     * Retrieve relevant context from Qdrant using semantic search
     */
    // Add to RAGService.java

    public List<String> retrieveRelevantContext(String query) {
        try {
            logger.info("=== RAG RETRIEVAL STARTED ===");
            logger.info("Query: {}", query);

            // 1. Generate embedding for user query using Gemini
            float[] queryVector = geminiService.generateEmbedding(query);
            logger.info("Generated embedding vector of size: {}", queryVector.length);

            // 2. Search in Qdrant
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
            logger.info("Qdrant URL: {}", qdrantUrl);

            Map<String, Object> searchRequest = new HashMap<>();
            searchRequest.put("vector", queryVector);
            searchRequest.put("limit", searchLimit);
            searchRequest.put("score_threshold", scoreThreshold);
            searchRequest.put("with_payload", true);

            logger.info("Search params - limit: {}, threshold: {}", searchLimit, scoreThreshold);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(searchRequest, headers);

            String searchUrl = qdrantUrl + "/collections/" + collectionName + "/points/search";
            logger.info("Searching at: {}", searchUrl);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    searchUrl,
                    request,
                    Map.class);

            logger.info("Search response status: {}", response.getStatusCode());

            // 3. Extract and format results
            if (response.getBody() != null && response.getBody().containsKey("result")) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.getBody().get("result");
                logger.info("Found {} results", results.size());

                if (results.isEmpty()) {
                    logger.warn("NO RESULTS FOUND! This means:");
                    logger.warn("1. Collection might be empty");
                    logger.warn("2. Score threshold ({}) might be too high", scoreThreshold);
                    logger.warn("3. Query embedding doesn't match any data");
                }

                return results.stream()
                        .map(result -> {
                            Double score = (Double) result.get("score");
                            Map<String, Object> payload = (Map<String, Object>) result.get("payload");

                            if (payload != null && payload.containsKey("text")) {
                                String text = (String) payload.get("text");
                                logger.info("✓ Retrieved - Score: {}, Preview: {}",
                                        score, text.substring(0, Math.min(100, text.length())));
                                return text;
                            }
                            logger.warn("✗ Result has no text in payload");
                            return null;
                        })
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList());
            }

            logger.warn("Response body is null or missing 'result' key");
            return Collections.emptyList();

        } catch (Exception e) {
            logger.error("=== RAG RETRIEVAL FAILED ===");
            logger.error("Error: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * Build smart filters based on query keywords
     */
    private Map<String, Object> buildSmartFilter(String query) {
        Map<String, Object> filter = new HashMap<>();
        String lowerQuery = query.toLowerCase();

        // Product type filters
        if (lowerQuery.contains("gà") || lowerQuery.contains("chicken")) {
            Map<String, Object> must = new HashMap<>();
            Map<String, Object> match = new HashMap<>();
            match.put("key", "type");
            match.put("match", Map.of("value", "product"));
            must.put("match", match);
            filter.put("must", List.of(must));
        }

        // Price-related queries
        if (lowerQuery.contains("giá") || lowerQuery.contains("bao nhiêu") || lowerQuery.contains("price")) {
            // Ensure we get products with price information
            logger.info("Price query detected, prioritizing products");
        }

        return filter;
    }
}