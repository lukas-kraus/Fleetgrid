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
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        mockMvc.perform(get("/api/drivers"))
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
        mockMvc.perform(post("/api/drivers")
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

}
