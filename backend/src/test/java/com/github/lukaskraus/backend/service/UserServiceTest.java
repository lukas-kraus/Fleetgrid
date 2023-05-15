package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

        MongoUser expected = new MongoUser("12345", username, password, lastLogin);
        when(mongoUserRepo.findMongoUserByUsername(username)).thenReturn(Optional.of(expected));
        // WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername(username);
        // THEN
        verify(mongoUserRepo).findMongoUserByUsername(username);
        assertEquals(expected.username(), actual.getUsername());
    }

}
