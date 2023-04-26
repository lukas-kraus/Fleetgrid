package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.repo.CarRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CarServiceTest {

    CarRepo carRepo = mock(CarRepo.class);
    CarService carService = new CarService(carRepo);

    @Test
    void getAllCars_ReturnEmptyList() {
        // GIVEN
        List<Car> expected = Collections.emptyList();
        when(carRepo.findAll()).thenReturn(Collections.emptyList());
        // WHEN
        List<Car> actual = carService.getAllCars();
        // THEN
        verify(carRepo).findAll();
        assertEquals(expected, actual);
    }
}
