package com.horizon.my_app.controller;

import com.horizon.my_app.models.Food;
import com.horizon.my_app.payload.request.searchFoodRequest;
import com.horizon.my_app.payload.response.MessageResponse;
import com.horizon.my_app.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class FoodController {

    @Autowired
    FoodRepository repo;

    @GetMapping("/all-food")
    public ResponseEntity<?> getAllFood(){
        List<Food> li = repo.findAll();
        ArrayList<Food> liFood = new ArrayList<Food>();
        for(Food f : li){
            if (f.isActive()){
                liFood.add(f);
            }
        }
        if(liFood.size() > 0){
            return ResponseEntity.ok(liFood);
        }
        return ResponseEntity.ok(new MessageResponse("No food found"));
    }

    @GetMapping("/food/{id}")
    public ResponseEntity<?> getAFood(@PathVariable Long id){
        Food food = repo.findById(id).get();
        if(food != null && food.isActive()){
            return ResponseEntity.ok(food);
        }
        return ResponseEntity.ok(new MessageResponse("Food not found"));
    }

    @PostMapping("/search-food")
    public ResponseEntity<?> searchFood(@RequestBody searchFoodRequest key){
        List<Food> foodList = repo.findAll();
        ArrayList<Food> returnFood = new ArrayList<>();
        for (Food f: foodList){
            if ( f.isActive()){
                boolean ckeck = f.getFoodName().contains(key.getKey());
                boolean check1 = f.getFoodDescription().contains(key.getKey());
                 if(ckeck || check1) {
                     returnFood.add(f);
                 }
            }
        }
        if(returnFood.size() == 0){
            return ResponseEntity.ok(new MessageResponse("No food have name or description like your input text"));
        }
        return ResponseEntity.ok(returnFood);
    }

    @PostMapping("/create-food")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> createFood(@RequestBody Food food){
        Food f = repo.save(food);
        return ResponseEntity.ok(f);
    }

    @PutMapping("/update-food/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> updateFood(@RequestBody Food food, @PathVariable Long id){
        Food updateFood = repo.findById(id).get();
        if(updateFood != null){
            updateFood.setFoodName(food.getFoodName());
            updateFood.setFoodDescription(food.getFoodDescription());
            updateFood.setCostPrice(food.getCostPrice());
            updateFood.setSalePrice(food.getSalePrice());
            updateFood.setQuantity(food.getQuantity());
            updateFood.setFoodImage(food.getFoodImage());
            return ResponseEntity.ok(repo.save(updateFood));
        }
        return ResponseEntity.ok(new MessageResponse("Cannot find food with this id: {}" + id));
    }

    @PutMapping("/active-food/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('MODERATOR')")
    public ResponseEntity<?> activeFood(@PathVariable long id){
        Food f = repo.findById(id).get();
        if (f != null){
            f.setActive(true);
            return ResponseEntity.ok(repo.save(f));
        }
        return ResponseEntity.ok(new MessageResponse("Cannot find food with this id: {}" + id));
    }

    @PutMapping("/deactive-food/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('MODERATOR')")
    public ResponseEntity<?> unactiveFood(@PathVariable long id){
        Food f = repo.findById(id).get();
        if (f != null){
            f.setActive(false);
            return ResponseEntity.ok(repo.save(f));
        }
        return ResponseEntity.ok(new MessageResponse("Cannot find food with this id: {}" + id));
    }

    @GetMapping("/admin-all-food")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('MODERATOR')")
    public ResponseEntity<?> adminAllFood(){
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/admin-get-food/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('MODERATOR')")
    public ResponseEntity<?> adminGetFood(@PathVariable long id){
        return ResponseEntity.ok(repo.findById(id).get());
    }
}
