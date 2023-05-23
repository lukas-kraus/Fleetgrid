package com.github.lukaskraus.backend.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public record Driver(
        @Id
        String id,
        String firstname,
        String lastname,
        LocalDate birthday,
        Address address
) {
}