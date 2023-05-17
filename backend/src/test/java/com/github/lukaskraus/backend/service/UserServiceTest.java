package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

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

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", null, lastLogin);
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

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", null, lastLogin);
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

        MongoUser expected = new MongoUser("12345", username, password, "Kevin", "Stupid", lastLogin, newLastLogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        MongoUser actual = mongoUserDetailsService.getUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected, actual);
        assertNotEquals(expected.lastLogin(), actual.newLastLogin());
    }
}
