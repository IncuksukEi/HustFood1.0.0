package com.hustfood.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GeminiService {
    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.model}")
    private String geminiModel;

    @Value("${gemini.embedding.model}")
    private String embeddingModel;

    /**
     * Generate chat completion using Gemini API
     */
    public String generateChatCompletion(String prompt) {
        try {
            String url = String.format("%s/%s:generateContent?key=%s",
                    geminiApiUrl, geminiModel, geminiApiKey);

            Map<String, Object> requestBody = new HashMap<>();

            // Build contents array
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            List<Map<String, String>> parts = new ArrayList<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            content.put("parts", parts);
            contents.add(content);

            requestBody.put("contents", contents);

            // Generation config
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("maxOutputTokens", 1000);
            requestBody.put("generationConfig", generationConfig);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            logger.debug("Sending request to Gemini API: {}", requestBody);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> partsResponse = (List<Map<String, Object>>) contentResponse.get("parts");
                    if (!partsResponse.isEmpty()) {
                        return (String) partsResponse.get(0).get("text");
                    }
                }
            }

            logger.error("Invalid response format from Gemini API: {}", response.getBody());
            return null;

        } catch (Exception e) {
            logger.error("Error calling Gemini API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate chat completion", e);
        }
    }

    /**
     * Generate embeddings using Gemini API
     */
    public float[] generateEmbedding(String text) {
        try {
            String url = String.format("%s/%s:embedContent?key=%s",
                    geminiApiUrl, embeddingModel, geminiApiKey);

            Map<String, Object> requestBody = new HashMap<>();

            Map<String, Object> content = new HashMap<>();
            List<Map<String, String>> parts = new ArrayList<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", text);
            parts.add(part);
            content.put("parts", parts);

            requestBody.put("content", content);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            logger.debug("Generating embedding for text: {}", text.substring(0, Math.min(50, text.length())));

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("embedding")) {
                Map<String, Object> embedding = (Map<String, Object>) response.getBody().get("embedding");
                List<Double> values = (List<Double>) embedding.get("values");

                float[] result = new float[values.size()];
                for (int i = 0; i < values.size(); i++) {
                    result[i] = values.get(i).floatValue();
                }
                return result;
            }

            throw new RuntimeException("Invalid embedding response from Gemini API");

        } catch (Exception e) {
            logger.error("Error generating embedding: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate embedding", e);
        }
    }
}