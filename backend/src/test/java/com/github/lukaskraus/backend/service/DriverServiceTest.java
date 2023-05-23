package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Address;
import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    void addDriver_verifyAddition() {
        // GIVEN
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");
        Driver actual = new Driver("123", "Max", "Mustermann", birthday, address);

        when(driverRepo.save(actual)).thenReturn(actual);
        // WHEN
        Driver expected = driverService.addDriver(actual);
        // THEN
        verify(driverRepo).save(actual);
        assertEquals(actual, expected);
    }

    @Test
    void getDriverById_ExpectDriverById() {
        // GIVEN
        String id = "12345";
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");

        Driver expected = new Driver("123", "Angela", "Merkel", birthday, address);
        when(driverRepo.findById(id)).thenReturn(Optional.of(expected));
        // WHEN
        Driver actual = driverService.getDriverById(id);
        // THEN
        verify(driverRepo).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void deleteDriver_verifyDeletion() {
        // GIVEN
        String id = "999";
        // WHEN
        driverService.deleteDriver(id);
        // THEN
        verify(driverRepo).deleteById(id);
    }

    @Test
    void editDriverById() {
        // GIVEN
        String id = "123567";
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");

        Driver driver = new Driver("123", "Angela", "Merkel", birthday, address);
        when(driverRepo.findById(id)).thenReturn(Optional.of(driver));
        // WHEN
        driverService.editDriver(driver);
        // THEN
        verify(driverRepo).save(driver);
    }

    @Test
    void getNotExistentDriver_ReturnException() {
        // GIVEN
        String id = "9999";
        // WHEN
        when(driverRepo.findById(id)).thenThrow(new NoSuchElementException());
        // THEN
        assertThrows(NoSuchElementException.class, () -> driverService.getDriverById(id));
    }

}
