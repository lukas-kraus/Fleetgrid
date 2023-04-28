package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.repo.CarRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CarService {

    private final CarRepo carRepo;

    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    public Car getCarById(String id) {
        return carRepo.findById(id).orElseThrow();
    }

    public Car addCar(Car car) {
        return carRepo.save(car);
    }
}
