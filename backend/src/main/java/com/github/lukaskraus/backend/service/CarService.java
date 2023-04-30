package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.repo.CarRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class CarService {

    private final CarRepo carRepo;

    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    public Car getCarById(String id) {
        return carRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Car with id " + id + " not found"));
    }

    public Car addCar(Car car) {
        return carRepo.save(car);
    }

    public void deleteCar(String id) {
        carRepo.deleteById(id);
    }
}
