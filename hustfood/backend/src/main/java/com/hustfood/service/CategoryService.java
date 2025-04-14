package com.hustfood.service;

import com.hustfood.entity.Category;
import com.hustfood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Lấy tất cả các category
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
