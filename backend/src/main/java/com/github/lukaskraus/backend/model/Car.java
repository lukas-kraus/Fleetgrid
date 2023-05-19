package com.github.lukaskraus.backend.model;

import org.springframework.data.annotation.Id;

public record Car(
        @Id
        String id,
        String model,
        String license_plate,
        String color,
        Status status,
        String driver
) {
}