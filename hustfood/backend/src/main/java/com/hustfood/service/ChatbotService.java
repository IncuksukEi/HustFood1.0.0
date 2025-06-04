package com.hustfood.service;

import com.hustfood.entity.Product;
import com.hustfood.entity.User;
import com.hustfood.repository.ProductRepository;
import com.hustfood.repository.UserRepository;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ChatbotService {

    private final OpenAiService openAiService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatbotService(OpenAiService openAiService,
                         ProductRepository productRepository,
                         UserRepository userRepository) {
        this.openAiService = openAiService;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public String processMessage(String message, String sessionId) {
        // Lấy context từ database
        List<Product> products = productRepository.findAll();

        // Tạo system prompt với context
        String systemPrompt = String.format("""
            You are a helpful food ordering assistant for HustFood, a food delivery service at Hanoi University of Science and Technology.
            Available products: %s
            
            Your role is to:
            1. Help users find and order food from our menu
            2. Provide accurate information about prices and availability
            3. Explain our ordering process and delivery options
            4. Handle special requests and dietary requirements
            5. Assist with order tracking and support
            
            Guidelines:
            - Always be polite and professional
            - Keep responses concise and clear
            - If you're unsure about something, say so
            - For order-specific questions, guide users to check their order history
            - For payment issues, direct users to our payment support
            
            Current menu and prices are as follows:
            %s
            """, products, formatProducts(products));

        // Gọi OpenAI API
        ChatCompletionRequest request = ChatCompletionRequest.builder()
            .model("gpt-3.5-turbo")
            .messages(Arrays.asList(
                new ChatMessage("system", systemPrompt),
                new ChatMessage("user", message)
            ))
            .build();

        return openAiService.createChatCompletion(request)
            .getChoices().get(0).getMessage().getContent();
    }

    private String formatProducts(List<Product> products) {
        StringBuilder sb = new StringBuilder();
        for (Product product : products) {
            sb.append(String.format("- %s: %s VND\n", 
                product.getName(), 
                product.getPrice()));
        }
        return sb.toString();
    }
} 