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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CarIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CarRepo carRepo;

    @BeforeEach
    void addCarToRepo() {
        carRepo.save(new Car("999", "Käfer", "A-BC-123", "black", Status.PARKED, "182391238"));
    }

    @WithMockUser
    @Test
    void getAllCars_expectAllCars() throws Exception {
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

    @WithMockUser
    @Test
    void addCar_savesCar() throws Exception {
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
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void deleteCar_verifyDeletion() throws Exception {
        mockMvc.perform(delete("/api/cars/999").with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/cars"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void getCarById_ExpectCar() throws Exception {
        mockMvc.perform(get("/api/cars/999").with(csrf()))
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

    @DirtiesContext
    @WithMockUser
    @Test
    void editExistingCar_ExpectOk() throws Exception {
        mockMvc.perform(put("/api/cars/567").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                    "id": "567",
                                    "model": "ID.3 Pro",
                                    "license_plate": "K-NW-315",
                                    "color": "blue",
                                    "status": "CHARGING"
                                }
                                """).with(csrf())).
                andExpect(status().isOk());
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void editNonExistingCar_ExpectBadRequest() throws Exception {
        mockMvc.perform(put("/api/cars/999999").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                    "id": "567",
                                    "model": "ID.3 Pro",
                                    "license_plate": "K-NW-315",
                                    "color": "blue",
                                    "status": "CHARGING"
                                }
                                """).with(csrf())).
                andExpect(status().isBadRequest());
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void getSpecificResponseExceptionWhenCarNotFound() throws Exception {
        mockMvc.perform(get("/api/cars/999999")
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Car with id 999999 not found"));
    }
}
