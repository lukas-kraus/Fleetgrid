package com.github.lukaskraus.backend.model;

public record Address(
        String street,
        String city,
        String postalCode,
        String country
) {
}