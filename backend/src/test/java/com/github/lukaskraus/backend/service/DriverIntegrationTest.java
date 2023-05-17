package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.Driver;
import com.github.lukaskraus.backend.repo.DriverRepo;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DriverIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    DriverRepo driverRepo;

    @BeforeEach
    void addDriverToRepo() {
        driverRepo.save(new Driver("123", "Max", "Mustermann"));
    }

    @WithMockUser
    @Test
    void getAllDrivers_ExpectAllDrivers() throws Exception {
        mockMvc.perform(get("/api/driver"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": "123",
                            "firstname": "Max",
                            "lastname": "Mustermann"
                        }]
                         """));
    }

    @WithMockUser
    @Test
    void addDriver_savesDriver() throws Exception {
        mockMvc.perform(post("/api/driver")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "123",
                                    "firstname": "Max",
                                    "lastname": "Mustermann"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void deleteDriver_verifyDeletion() throws Exception {
        mockMvc.perform(delete("/api/driver/123").with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/driver"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void getDriverById_ExpectDriver() throws Exception {
        mockMvc.perform(get("/api/driver/123").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                    {
                                    "id": "123",
                                    "firstname": "Max",
                                    "lastname": "Mustermann"
                                    }
                        """));
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void editExistingDriver_ExpectOk() throws Exception {
        mockMvc.perform(put("/api/driver/213").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                    "id": "213",
                                    "firstname": "Angela",
                                    "lastname": "Merkel"
                                }
                                """).with(csrf())).
                andExpect(status().isOk());
    }

    @DirtiesContext
    @WithMockUser
    @Test
    void editNonExistingDriver_ExpectBadRequest() throws Exception {
        mockMvc.perform(put("/api/driver/999999").
                        contentType(MediaType.APPLICATION_JSON).
                        content("""
                                {
                                    "id": "213",
                                    "firstname": "Hansi",
                                    "lastname": "Hintersee"
                                }
                                """).with(csrf())).
                andExpect(status().isBadRequest());
    }
}
