package com.hustfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@Service
public class ChatbotService {
    private static final Logger logger = LoggerFactory.getLogger(ChatbotService.class);

    private final GeminiService geminiService;
    private final RAGService ragService;

    @Autowired
    public ChatbotService(GeminiService geminiService, RAGService ragService) {
        this.geminiService = geminiService;
        this.ragService = ragService;
    }

    public String ask(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
        }

        try {
            // 1. Retrieve relevant context from database via Qdrant
            List<String> relevantContexts = ragService.retrieveRelevantContext(userMessage);

            logger.info("Retrieved {} relevant contexts for query: {}",
                    relevantContexts.size(), userMessage);

            // 2. Build augmented prompt with retrieved context
            String augmentedPrompt = buildEnhancedPrompt(userMessage, relevantContexts);

            // 3. Call Gemini API with augmented prompt
            String response = geminiService.generateChatCompletion(augmentedPrompt);

            if (response != null && !response.trim().isEmpty()) {
                return response;
            }

            return "Xin lỗi, tôi không thể xử lý câu hỏi của bạn lúc này.";

        } catch (Exception e) {
            logger.error("Error processing chat request: {}", e.getMessage(), e);

            if (e.getMessage().contains("quota")) {
                return "Xin lỗi, dịch vụ chatbot đang tạm thời không khả dụng. Vui lòng thử lại sau.";
            } else if (e.getMessage().contains("401") || e.getMessage().contains("403")) {
                return "Xin lỗi, dịch vụ chatbot đang gặp vấn đề xác thực. Vui lòng thử lại sau.";
            } else if (e.getMessage().contains("429")) {
                return "Xin lỗi, dịch vụ chatbot đang quá tải. Vui lòng thử lại sau một lát.";
            }

            return "Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.";
        }
    }

    private String buildEnhancedPrompt(String userMessage, List<String> contexts) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("Bạn là trợ lý ảo thông minh của nhà hàng HustFood. ");
        prompt.append("Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng dựa trên thông tin sau:\n\n");

        if (contexts.isEmpty()) {
            prompt.append("Không tìm thấy thông tin cụ thể liên quan đến câu hỏi.\n");
            prompt.append("Hãy trả lời một cách thân thiện rằng bạn không có thông tin chi tiết về vấn đề này ");
            prompt.append("và đề xuất khách hàng liên hệ trực tiếp với nhà hàng.\n");
        } else {
            prompt.append("=== THÔNG TIN TỪ CƠ SỞ DỮ LIỆU ===\n");
            for (int i = 0; i < contexts.size(); i++) {
                prompt.append(String.format("[%d] %s\n\n", i + 1, contexts.get(i)));
            }
        }

        prompt.append("=== CÂU HỎI CỦA KHÁCH HÀNG ===\n");
        prompt.append(userMessage).append("\n\n");

        prompt.append("=== HƯỚNG DẪN TRẢ LỜI ===\n");
        prompt.append("1. CHỈ sử dụng thông tin có trong phần 'THÔNG TIN TỪ CƠ SỞ DỮ LIỆU' ở trên\n");
        prompt.append("2. Trả lời bằng tiếng Việt, ngắn gọn và thân thiện\n");
        prompt.append("3. Nếu câu hỏi về giá, hãy nêu chính xác giá từ dữ liệu\n");
        prompt.append("4. Nếu câu hỏi về sản phẩm/món ăn, liệt kê tên và giá rõ ràng\n");
        prompt.append("5. KHÔNG bịa ra thông tin không có trong dữ liệu\n");
        prompt.append("6. Nếu không có thông tin, hãy nói thẳng là không có dữ liệu\n\n");

        prompt.append("HÃY TRẢ LỜI:");

        return prompt.toString();
    }
}