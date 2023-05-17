package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class DriverServiceTest {

    DriverRepo driverRepo = mock(DriverRepo.class);
    DriverService driverService = new DriverService(driverRepo);

    @Test
    void getAllDrivers_ReturnsEmptyList_WhenNoDriversExist() {
        // GIVEN
        List<Driver> expected = Collections.emptyList();
        when(driverRepo.findAll()).thenReturn(Collections.emptyList());
        // WHEN
        List<Driver> actual = driverService.getAllDrivers();
        // THEN
        verify(driverRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addCar_verifyAddition() {
        // GIVEN
        Driver actual = new Driver("123", "Max", "Mustermann");
        when(driverRepo.save(actual)).thenReturn(actual);
        // WHEN
        Driver expected = driverService.addDriver(actual);
        // THEN
        verify(driverRepo).save(actual);
        assertEquals(actual, expected);
    }

}
