package com.anas.userauthsystem.controller;

import com.anas.userauthsystem.dto.SignInRequest;
import com.anas.userauthsystem.dto.SignUpRequest;
import com.anas.userauthsystem.model.User;
import com.anas.userauthsystem.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.anas.userauthsystem.service.EmailService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // Store password reset codes temporarily in memory
    private Map<String, String> resetCodes = new HashMap<>();

    // --- SIGN UP ---
    // Creates a new user account if validation passes and username isn't taken
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request, BindingResult result) {
        // If there are validation errors, return them
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> "❌ " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }

        // Check if username is already in use
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Username already exists!");
        }

        // Save the new user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAddress(request.getAddress());
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // --- SIGN IN ---
    // Checks username + password, returns user details if correct
    @PostMapping("/signin")
    public Object signIn(@RequestBody SignInRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        // No user found with this username
        if (userOpt.isEmpty()) {
            return "User not found!";
        }

        User user = userOpt.get();

        // Wrong password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Incorrect password!";
        }

        // Login successful
        return user;
    }
}
