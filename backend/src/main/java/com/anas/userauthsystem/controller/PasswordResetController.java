package com.anas.userauthsystem.controller;

import com.anas.userauthsystem.dto.ForgetPasswordRequest;
import com.anas.userauthsystem.dto.ResetPasswordRequest;
import com.anas.userauthsystem.model.PasswordResetToken;
import com.anas.userauthsystem.model.User;
import com.anas.userauthsystem.repository.PasswordResetTokenRepository;
import com.anas.userauthsystem.repository.UserRepository;
import com.anas.userauthsystem.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    // --- SEND RESET CODE ---
    // Called when the user clicks "Forgot Password" — generates a reset code and emails it
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgetPasswordRequest request) {
        String response = passwordResetService.createPasswordResetToken(request.getEmail());

        if (response.equals("User not found")) {
            // No account exists with this email
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ User not found");
        }

        // Email with reset code successfully sent
        return ResponseEntity.ok("✅ Reset code sent to your email.");
    }

    // --- RESET PASSWORD ---
    // Validates the reset code, updates the password, and removes the token so it can't be reused
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        // Check if token exists
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(request.getToken());

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid code.");
        }

        PasswordResetToken token = tokenOpt.get();

        // Check if token expired
        if (token.getExpiration().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Code expired.");
        }

        // Token valid → update password
        User user = token.getUser();
        user.setPassword(new BCryptPasswordEncoder().encode(request.getNewPassword()));
        userRepository.save(user);

        // Delete token so it can't be used again
        tokenRepository.delete(token);

        return ResponseEntity.ok("✅ Password changed successfully.");
    }
}
