package com.github.lukaskraus.backend.model;

import java.time.LocalDateTime;

public record MongoUserDTO(
        String username,
        LocalDateTime lastLogin) {
}