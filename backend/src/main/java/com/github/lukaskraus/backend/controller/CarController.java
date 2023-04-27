package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }
}
