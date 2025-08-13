package com.anas.userauthsystem.service;

import com.anas.userauthsystem.model.PasswordResetToken;
import com.anas.userauthsystem.model.User;
import com.anas.userauthsystem.repository.PasswordResetTokenRepository;
import com.anas.userauthsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    public String createPasswordResetToken(String email) {
        // Check if a user with the provided email exists
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        // If a previous reset token exists for the user, remove it
        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);

        // Generate a random 6-digit code (padded with leading zeroes if necessary)
        String token = String.format("%06d", new Random().nextInt(999999));

        // Create a new token entity and set its expiration to 15 minutes from now
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiration(LocalDateTime.now().plusMinutes(15));
        tokenRepository.save(resetToken);

        // Send the generated token to the user's email
        sendResetCodeEmail(email, token);

        return "Token sent to email";
    }

    // Sends a simple email containing the password reset code
    private void sendResetCodeEmail(String toEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("🔐 Your Password Reset Code");
        message.setText("Hello,\n\n" +
                "Your password reset code is: " + code + "\n\n" +
                "This code is valid for 15 minutes.\n\n" +
                "If you did not request a password reset, you can safely ignore this message.");

        mailSender.send(message);
    }
}
