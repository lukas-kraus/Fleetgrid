package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepo driverRepo;

    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    public Driver addDriver(Driver driver) {
        return driverRepo.save(driver);
    }

}
