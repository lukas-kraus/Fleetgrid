package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/driver")
public class DriverController {

    private final DriverService driverService;

    @GetMapping
    List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    Driver getDriverById(@PathVariable String id) {
        try {
            return driverService.getDriverById(id);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Driver not found!", exception);
        }
    }

    @PostMapping
    Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

    @PutMapping("/{id}")
    Driver editDriver(@PathVariable String id, @RequestBody Driver driver) {
        if (!driver.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return driverService.editDriver(driver);
    }

    @DeleteMapping("/{id}")
    void deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);
    }
}
