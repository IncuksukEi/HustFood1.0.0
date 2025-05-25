// IngredientsController.java
package com.hustfood.controller;

import com.hustfood.dto.IngredientsDTO;
import com.hustfood.entity.Ingredients;
import com.hustfood.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")
@RestController
@RequestMapping("/api/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @GetMapping
    public List<IngredientsDTO> getAllIngredients() {
        return ingredientsService.getAllIngredients();
    }

    @PostMapping
    public Ingredients addIngredient(@RequestBody Ingredients ingredient) {
        return ingredientsService.addIngredient(ingredient);
    }

    @PutMapping("/{id}")
    public Ingredients updateIngredient(@PathVariable Long id, @RequestBody Ingredients ingredient) {
        return ingredientsService.updateIngredient(id, ingredient);
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        ingredientsService.deleteIngredient(id);
    }
}
