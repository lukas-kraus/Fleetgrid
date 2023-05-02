package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
        return carService.getCarById(id);
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
