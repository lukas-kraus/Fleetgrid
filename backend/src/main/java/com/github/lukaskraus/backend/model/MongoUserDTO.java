package com.github.lukaskraus.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record MongoUserDTO(
        String username,
        String firstname,
        String lastname,
        LocalDate birthday,
        Address address,
        LocalDateTime lastLogin,
        LocalDateTime newLastLogin
) {
}