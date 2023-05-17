package com.github.lukaskraus.backend.model;

import org.springframework.data.annotation.Id;

public record Driver(
        @Id
        String id,
        String firstname,
        String lastname,
        String address
) {
}