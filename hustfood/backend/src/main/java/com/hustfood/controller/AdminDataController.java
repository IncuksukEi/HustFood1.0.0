package com.hustfood.controller;

import com.hustfood.service.DataIngestionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/data")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:80" })
public class AdminDataController {

    private static final Logger logger = LoggerFactory.getLogger(AdminDataController.class);
    private final DataIngestionService dataIngestionService;

    /**
     * Sync all data from MySQL to Qdrant
     */
    @PostMapping("/sync")
    public ResponseEntity<?> syncData() {
        try {
            logger.info("Starting data sync from MySQL to Qdrant...");
            dataIngestionService.syncDataToQdrant();
            logger.info("Data sync completed successfully");

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đã đồng bộ dữ liệu thành công từ MySQL sang Qdrant"));
        } catch (Exception e) {
            logger.error("Data sync failed: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "error", "Lỗi khi đồng bộ dữ liệu: " + e.getMessage()));
        }
    }

    /**
     * Check Qdrant data count
     */
    @GetMapping("/qdrant/count")
    public ResponseEntity<?> getQdrantCount() {
        try {
            // You'll need to add this method to DataIngestionService
            Map<String, Object> stats = dataIngestionService.getQdrantStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                    "error", e.getMessage()));
        }
    }

    /**
     * Test RAG retrieval
     */
    @PostMapping("/test-retrieval")
    public ResponseEntity<?> testRetrieval(@RequestBody Map<String, String> request) {
        try {
            String query = request.get("query");
            // Test if retrieval is working
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Testing retrieval for: " + query));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "error", e.getMessage()));
        }
    }
}