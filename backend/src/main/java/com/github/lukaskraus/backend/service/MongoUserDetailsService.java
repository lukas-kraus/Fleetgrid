package com.github.lukaskraus.backend.service;

import com.github.lukaskraus.backend.model.MongoUser;
import com.github.lukaskraus.backend.repo.MongoUserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.NoSuchElementException;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;

    public MongoUserDetailsService(MongoUserRepo mongoUserRepo) {
        this.mongoUserRepo = mongoUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name: " + username + " not found!"));
        return new User(mongoUser.username(), mongoUser.password(), Collections.emptyList());
    }

    public MongoUser getUserByUsername(String username) {
        return mongoUserRepo.findMongoUserByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}