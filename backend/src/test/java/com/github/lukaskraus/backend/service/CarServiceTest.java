package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.model.Status;
import com.github.lukaskraus.backend.repo.CarRepo;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CarServiceTest {

    CarRepo carRepo = mock(CarRepo.class);
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    CarService carService = new CarService(carRepo);
    MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepo);

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
    void addCar_verifyAddition() {
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

    @Test
    void deleteCar_verifyDeletion() {
        // GIVEN
        String id = "999";
        // WHEN
        carService.deleteCar(id);
        // THEN
        verify(carRepo).deleteById(id);
    }

    @Test
    void editCarById() {
        // GIVEN
        String id = "123567";
        Car car = new Car("12345", "Käfer", "A-BC-123", "black", Status.PARKED);
        when(carRepo.findById(id)).thenReturn(Optional.of(car));
        // WHEN
        carService.editCar(car);
        // THEN
        verify(carRepo).save(car);
    }

    @Test
    void getNotExistentCar_ReturnException() {
        // GIVEN
        String id = "9999";
        // WHEN
        when(carRepo.findById(id)).thenThrow(new NoSuchElementException());
        // THEN
        assertThrows(NoSuchElementException.class, () -> carService.getCarById(id));
    }

    @Test
    void getMongoUserByName() {
        // GIVEN
        String username = "randomuser";
        String password = "randompassword1";
        LocalDateTime lastlogin = LocalDateTime.now();

        MongoUser expected = new MongoUser("12345", username, password, lastlogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected.username(), actual.getUsername());
    }
}
