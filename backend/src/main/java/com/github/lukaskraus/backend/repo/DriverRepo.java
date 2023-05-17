package com.github.lukaskraus.backend.repo;

import com.github.lukaskraus.backend.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepo extends MongoRepository<Driver, String> {
}