package com.github.lukaskraus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("mongoUser")
public record MongoUser(
        @Id
        String id,
        String username,
        String password,
        String firstname,
        String lastname,
        LocalDateTime lastLogin,
        LocalDateTime newLastLogin
) {
}