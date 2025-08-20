package com.anas.userauthsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a password reset token associated with a user.
 * Used when a user requests to reset their password.
 */
@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The unique token string sent to the user via email.
     * Used to verify the reset password request.
     */
    private String token;

    /**
     * The date and time when this token will expire.
     * After this point, the token is no longer valid.
     */
    private LocalDateTime expiration;

    /**
     * The user associated with this token.
     * One token is linked to exactly one user.
     */
    @OneToOne
    private User user;

    // Getters and setters for all fields.

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDateTime expiration) {
        this.expiration = expiration;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
