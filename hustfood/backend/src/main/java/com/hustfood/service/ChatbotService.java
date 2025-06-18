package com.hustfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;

@Service
public class ChatbotService {
    private static final Logger logger = LoggerFactory.getLogger(ChatbotService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String apiUrl;
    private final RAGService ragService;
    private final String qdrantHost;
    private final int qdrantPort;
    private final String COLLECTION_NAME;

    @Autowired
    public ChatbotService(RestTemplate restTemplate,
                         @Value("${openai.api.key}") String apiKey,
                         @Value("${openai.api.url}") String apiUrl,
                         RAGService ragService,
                         @Value("${qdrant.host}") String qdrantHost,
                         @Value("${qdrant.port}") int qdrantPort,
                         @Value("${qdrant.collection.name}") String COLLECTION_NAME) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.ragService = ragService;
        this.qdrantHost = qdrantHost;
        this.qdrantPort = qdrantPort;
        this.COLLECTION_NAME = COLLECTION_NAME;
        logger.info("ChatbotService initialized with API URL: {}", apiUrl);
        if (apiKey == null || apiKey.trim().isEmpty()) {
            logger.error("OpenAI API key is not configured");
        } else {
            logger.info("API Key is configured (length: {})", apiKey.length());
            logger.debug("API Key first 8 chars: {}", apiKey.substring(0, Math.min(8, apiKey.length())));
        }
    }

    public String ask(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
        }

        if (apiKey == null || apiKey.trim().isEmpty()) {
            logger.error("OpenAI API key is not configured");
            return "Xin lỗi, dịch vụ chatbot đang được bảo trì. Vui lòng thử lại sau.";
        }

        try {
            // 1. Retrieve relevant context
            List<String> relevantContexts = ragService.retrieveRelevantContext(userMessage);
            
            // 2. Build augmented prompt
            StringBuilder augmentedPrompt = new StringBuilder();
            augmentedPrompt.append("Bạn là trợ lý ảo của nhà hàng HustFood. ");
            augmentedPrompt.append("Dưới đây là một số thông tin liên quan:\n");
            
            for (String context : relevantContexts) {
                augmentedPrompt.append("- ").append(context).append("\n");
            }
            
            augmentedPrompt.append("\nCâu hỏi của khách hàng: ").append(userMessage);
            augmentedPrompt.append("\nHãy trả lời ngắn gọn, thân thiện và bằng tiếng Việt, ");
            augmentedPrompt.append("sử dụng thông tin trên nếu có liên quan.");

            // 3. Call GPT with augmented prompt
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            List<Map<String, String>> messages = new ArrayList<>();
            
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", augmentedPrompt.toString());
            messages.add(systemMessage);
            
            Map<String, String> userMessageMap = new HashMap<>();
            userMessageMap.put("role", "user");
            userMessageMap.put("content", userMessage);
            messages.add(userMessageMap);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", messages);
            requestBody.put("temperature", 0.1);
            requestBody.put("max_tokens", 150);

            logger.debug("Sending request to OpenAI API: {}", objectMapper.writeValueAsString(requestBody));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            Map<String, Object> response = restTemplate.postForObject(apiUrl, request, Map.class);
            
            logger.debug("Received response from OpenAI API: {}", objectMapper.writeValueAsString(response));

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, String> message = (Map<String, String>) choice.get("message");
                    return message.get("content");
                }
            }
            
            logger.error("Invalid response format from OpenAI API: {}", response);
            return "Xin lỗi, tôi không thể xử lý câu hỏi của bạn lúc này.";
        } catch (Exception e) {
            logger.error("Error calling OpenAI API: {}", e.getMessage());
            
            // Handle specific error cases
            if (e.getMessage().contains("insufficient_quota")) {
                logger.error("OpenAI API quota exceeded. Please check billing details.");
                return "Xin lỗi, dịch vụ chatbot đang tạm thời không khả dụng do vượt quá giới hạn sử dụng. Vui lòng thử lại sau.";
            } else if (e.getMessage().contains("401")) {
                logger.error("OpenAI API authentication failed. Please check API key.");
                return "Xin lỗi, dịch vụ chatbot đang gặp vấn đề xác thực. Vui lòng thử lại sau.";
            } else if (e.getMessage().contains("429")) {
                logger.error("OpenAI API rate limit exceeded.");
                return "Xin lỗi, dịch vụ chatbot đang quá tải. Vui lòng thử lại sau một lát.";
            }
            
            return "Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.";
        }
    }

    private void verifyData() {
        try {
            String qdrantUrl = String.format("http://%s:%d", qdrantHost, qdrantPort);
            ResponseEntity<Map> response = restTemplate.getForEntity(
                qdrantUrl + "/collections/" + COLLECTION_NAME + "/points?limit=10",
                Map.class
            );
            
            List<Map<String, Object>> points = (List<Map<String, Object>>) response.getBody().get("result");
            for (Map<String, Object> point : points) {
                Map<String, Object> payload = (Map<String, Object>) point.get("payload");
                String text = (String) payload.get("text");
                logger.info("Verifying data: {}", text);
            }
        } catch (Exception e) {
            logger.error("Failed to verify data: {}", e.getMessage());
        }
    }
} 