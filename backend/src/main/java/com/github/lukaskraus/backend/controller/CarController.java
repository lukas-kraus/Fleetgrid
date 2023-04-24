package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
