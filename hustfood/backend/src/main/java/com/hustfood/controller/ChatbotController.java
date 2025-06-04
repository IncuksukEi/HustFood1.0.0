package com.hustfood.controller;

import com.hustfood.dto.ChatMessage;
import com.hustfood.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> sendMessage(@RequestBody ChatMessage message) {
        String response = chatbotService.processMessage(message.getContent(), message.getSessionId());
        return ResponseEntity.ok(response);
    }
} 