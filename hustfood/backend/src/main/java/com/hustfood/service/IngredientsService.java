// IngredientsService.java
package com.hustfood.service;

import com.hustfood.dto.IngredientsDTO;
import com.hustfood.entity.Ingredients;
import com.hustfood.entity.Product;
import com.hustfood.repository.IngredientsRepository;
import com.hustfood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IngredientsService {

    @Autowired
    private IngredientsRepository ingredientsRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<IngredientsDTO> getAllIngredients() {
    NumberFormat nf = NumberFormat.getInstance(new Locale("vi", "VN"));

    return ingredientsRepository.findAll().stream().map(ingredient -> {
        String productName = productRepository.findById(ingredient.getProductId())
                .map(Product::getName).orElse("Unknown");
        String quantity = nf.format(ingredient.getQuantity()) + ingredient.getUnit();
        return new IngredientsDTO(
                ingredient.getIngredientId(),           // ✅
                ingredient.getName(),
                ingredient.getType(),
                productName,
                quantity,
                ingredient.getPrice()                  // ✅
        );
    }).collect(Collectors.toList());
}

    public Ingredients addIngredient(Ingredients ingredient) {
        return ingredientsRepository.save(ingredient);
    }

    public Ingredients updateIngredient(Long id, Ingredients updated) {
        Optional<Ingredients> existing = ingredientsRepository.findById(id);
        if (existing.isPresent()) {
            Ingredients ing = existing.get();
            ing.setName(updated.getName());
            ing.setType(updated.getType());
            ing.setQuantity(updated.getQuantity());
            ing.setUnit(updated.getUnit());
            ing.setProductId(updated.getProductId());
            return ingredientsRepository.save(ing);
        }
        return null;
    }

    public void deleteIngredient(Long id) {
        ingredientsRepository.deleteById(id);
    }
}