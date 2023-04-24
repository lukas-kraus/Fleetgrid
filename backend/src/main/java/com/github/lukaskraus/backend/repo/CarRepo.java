package com.github.lukaskraus.backend.repo;

import com.github.lukaskraus.backend.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepo extends MongoRepository<Car, String> {
}