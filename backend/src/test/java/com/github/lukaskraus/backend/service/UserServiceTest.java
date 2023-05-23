package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Address;
import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.*;

class UserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepo);

    @Test
    void getMongoUserByName() {
        // GIVEN
        String username = "randomuser";
        String password = "randompassword1";
        LocalDateTime lastLogin = LocalDateTime.now();
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", birthday, address, null, lastLogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected.username(), actual.getUsername());
    }

    @Test
    void getMongoUserByUsername() {
        // GIVEN
        String username = "randomuser";
        String password = "randompassword1";
        LocalDateTime lastLogin = LocalDateTime.now();
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", birthday, address, null, lastLogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        MongoUser actual = mongoUserDetailsService.getUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected.username(), actual.username());
    }

    @Test
    void updateLastLoginWithNewLastLogin() {
        // GIVEN
        String username = "randomuser";
        String password = "randompassword1";
        LocalDateTime lastLogin = LocalDateTime.of(2023, 5, 16, 17, 30, 40, 50000);
        LocalDateTime newLastLogin = LocalDateTime.now();
        LocalDate birthday = LocalDate.of(1994, 3, 23);
        Address address = new Address("Musterstrasse 1", "Musterstadt", "12345", "Germany");

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", birthday, address, lastLogin, newLastLogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        MongoUser actual = mongoUserDetailsService.getUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected, actual);
        assertNotEquals(expected.lastLogin(), actual.newLastLogin());
    }
}
