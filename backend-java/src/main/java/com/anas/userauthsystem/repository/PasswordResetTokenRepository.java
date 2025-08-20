package com.anas.userauthsystem.repository;

import com.anas.userauthsystem.model.PasswordResetToken;
import com.anas.userauthsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for managing PasswordResetToken entities.
 * Provides methods to retrieve tokens by their value or associated user.
 */
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    /**
     * Finds a password reset token by its token string.
     *
     * @param token the token string
     * @return an Optional containing the token if found, or empty otherwise
     */
    Optional<PasswordResetToken> findByToken(String token);

    /**
     * Finds a password reset token associated with a specific user.
     *
     * @param user the user entity
     * @return an Optional containing the token if found, or empty otherwise
     */
    Optional<PasswordResetToken> findByUser(User user);
}
