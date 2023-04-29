package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Car;
import com.github.lukaskraus.backend.model.Status;
import com.github.lukaskraus.backend.repo.CarRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CarIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CarRepo carRepo;

    @BeforeEach
    void addRecipeToRepo() {
        carRepo.save(new Car("999", "Käfer", "A-BC-123", "black", Status.PARKED));
    }

    @Test
    void getAllCars_ExpectAllCars() throws Exception {
        mockMvc.perform(get("/api/cars"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": "999",
                            "model": "Käfer",
                            "license_plate": "A-BC-123",
                            "color": "black",
                            "status": "PARKED"
                        }]
                         """));
    }

    @Test
    void AddCar_SavesCar() throws Exception {
        mockMvc.perform(post("/api/cars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "567",
                                    "model": "ID.3",
                                    "license_plate": "D-EF-365",
                                    "color": "yellow",
                                    "status": "CHARGING"
                                }
                                """)
                )
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void getCarById_ExpectCar() throws Exception {
        mockMvc.perform(get("/api/cars/999"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "999",
                        "model": "Käfer",
                        "license_plate": "A-BC-123",
                        "color": "black",
                        "status": "PARKED"
                        }
                        """));
    }
}
