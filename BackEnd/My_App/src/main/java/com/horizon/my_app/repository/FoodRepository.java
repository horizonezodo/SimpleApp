package com.horizon.my_app.repository;

import com.horizon.my_app.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food,Long> {
    Optional<Food> findByFoodName(String foodName);

    Optional<Food> findByFoodDescription(String foodDescription);


}
