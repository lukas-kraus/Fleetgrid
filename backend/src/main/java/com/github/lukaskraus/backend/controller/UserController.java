package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.model.MongoUserDTO;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import com.github.lukaskraus.backend.service.MongoUserDetailsService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final MongoUserRepo mongoUserRepo;
    private final MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    public UserController(MongoUserRepo mongoUserRepo, MongoUserDetailsService mongoUserDetailsService) {
        this.mongoUserRepo = mongoUserRepo;
        this.mongoUserDetailsService = mongoUserDetailsService;
    }

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/{username}")
    public MongoUserDTO getUserByUsername(@PathVariable String username) {
        String user = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!user.equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User is not authorized to perform this operation");
        }
        MongoUser mongoUser = mongoUserDetailsService.getUserByUsername(username);
        return new MongoUserDTO(mongoUser.username(), mongoUser.firstname(), mongoUser.lastname(), mongoUser.lastLogin(), LocalDateTime.now());
    }

    @PostMapping("/login")
    public String login() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> optionalMongoUser = mongoUserRepo.findMongoUserByUsername(username);
        if (optionalMongoUser.isPresent()) {
            MongoUser mongoUser = optionalMongoUser.get();
            mongoUser = new MongoUser(mongoUser.id(), mongoUser.username(), mongoUser.password(), mongoUser.firstname(), mongoUser.lastname(), mongoUser.newLastLogin(), LocalDateTime.now());
            mongoUserRepo.save(mongoUser);
        }
        return username;
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }
}
