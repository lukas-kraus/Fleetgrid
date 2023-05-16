package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    MongoUserRepo mongoUserRepo;

    @DirtiesContext
    @WithMockUser(username = "kevin")
    @Test
    void showUsernameKevin_WhenLoggedIn() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("kevin"));
    }

    @DirtiesContext
    @Test
    void showAnonymousUser_WhenNotLoggedIn() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @DirtiesContext
    @WithMockUser(username = "kevin")
    @Test
    void showLastLogin_WhenUserLoggedIn() throws Exception {

        MongoUser testUser = new MongoUser("123", "kevin", "kevin123", null, LocalDateTime.now());
        mongoUserRepo.save(testUser);

        mockMvc.perform(get("/api/users/kevin")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("username").value("kevin"))
                .andExpect(jsonPath("lastLogin").isNotEmpty());
    }

    @DirtiesContext
    @WithMockUser(username = "kevin")
    @Test
    void throwForbiddenException_WhenUserIsNotEqualToLoggedIn() throws Exception {

        MongoUser testUser = new MongoUser("123", "kevin", "kevin123", null, LocalDateTime.now());
        mongoUserRepo.save(testUser);

        mockMvc.perform(get("/api/users/michael")
                        .with(csrf()))
                .andExpect(status().isForbidden());
    }

}
