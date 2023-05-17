package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/driver")
public class DriverController {
    private DriverService driverService;

    @PostMapping
    Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }
}
