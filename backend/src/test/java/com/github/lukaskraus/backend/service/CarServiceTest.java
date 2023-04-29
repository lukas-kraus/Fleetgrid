package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.model.Status;
import com.github.lukaskraus.backend.repo.CarRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CarServiceTest {

    CarRepo carRepo = mock(CarRepo.class);
    CarService carService = new CarService(carRepo);

    @Test
    void getAllCars_ReturnsEmptyList_WhenNoCarsExist() {
        // GIVEN
        List<Car> expected = Collections.emptyList();
        when(carRepo.findAll()).thenReturn(Collections.emptyList());
        // WHEN
        List<Car> actual = carService.getAllCars();
        // THEN
        verify(carRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addCar() {
        // GIVEN
        Car actual = new Car("567", "ID.3", "D-EF-365", "yellow", Status.CHARGING);
        when(carRepo.save(actual)).thenReturn(actual);
        // WHEN
        Car expected = carService.addCar(actual);
        // THEN
        verify(carRepo).save(actual);
        assertEquals(actual, expected);
    }

    @Test
    void getCarById_ExpectCarById() {
        // GIVEN
        String id = "12345";
        Car expected = new Car("12345", "Käfer", "A-BC-123", "black", Status.PARKED);
        when(carRepo.findById(id)).thenReturn(Optional.of(expected));
        // WHEN
        Car actual = carService.getCarById(id);
        // THEN
        verify(carRepo).findById(id);
        assertEquals(expected, actual);
    }
}
