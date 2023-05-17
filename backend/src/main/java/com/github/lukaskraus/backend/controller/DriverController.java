package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @PostMapping
    Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }
}
