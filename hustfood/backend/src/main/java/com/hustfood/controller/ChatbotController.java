package com.hustfood.controller;

import com.hustfood.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:80"}, allowCredentials = "true")
public class ChatbotController {
    private static final Logger logger = LoggerFactory.getLogger(ChatbotController.class);

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> request) {
        try {
            logger.info("Received chat request: {}", request);
            
            String message = request.get("message");
            if (message == null || message.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
            }

            String response = chatbotService.ask(message);
            logger.info("Chat response: {}", response);
            
            return ResponseEntity.ok(Map.of("response", response));
        } catch (Exception e) {
            logger.error("Error processing chat request", e);
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to process message"));
        }
    }
} 