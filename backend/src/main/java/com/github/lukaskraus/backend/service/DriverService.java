package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepo driverRepo;

    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    public Driver getDriverById(String id) {
        return driverRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Driver with id " + id + " not found"));
    }

    public Driver addDriver(Driver driver) {
        return driverRepo.save(driver);
    }

    public Driver editDriver(Driver driver) {
        return driverRepo.save(driver);
    }

    public void deleteDriver(String id) {
        driverRepo.deleteById(id);
    }
}
