package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @GetMapping
    List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    Car getCarById(@PathVariable String id) {
        try {
            return carService.getCarById(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found!", exception);
        }
    }

    @PostMapping
    Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    @PutMapping("/{id}")
    Car editCar(@PathVariable String id, @RequestBody Car car) {
        if (!car.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return carService.editCar(car);
    }

    @DeleteMapping("/{id}")
    void deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
    }
}
