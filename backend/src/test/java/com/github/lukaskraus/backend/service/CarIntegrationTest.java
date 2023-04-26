package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.repo.CarRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CarIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CarRepo carRepo;

    @Test
    void getAllCarsReturnAllCars() throws Exception {
        mockMvc.perform(get("/api/cars"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                         """));

    }
}
