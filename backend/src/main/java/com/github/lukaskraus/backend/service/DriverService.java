package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepo driverRepo;

    public Driver addDriver(Driver driver) {
        return driverRepo.save(driver);
    }
}
