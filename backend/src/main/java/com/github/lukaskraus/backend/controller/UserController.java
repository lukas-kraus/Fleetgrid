package com.github.lukaskraus.backend.controller;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MongoUserRepo mongoUserRepo;

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public String login() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<MongoUser> optionalMongoUser = mongoUserRepo.findMongoUserByUsername(username);
        if (optionalMongoUser.isPresent()) {
            MongoUser mongoUser = optionalMongoUser.get();
            mongoUser = new MongoUser(mongoUser.id(), mongoUser.username(), mongoUser.password(), LocalDateTime.now());
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
