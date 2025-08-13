package com.anas.userauthsystem.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends a styled HTML email containing a password reset code.
     *
     * @param toEmail The recipient's email address.
     * @param code    The unique reset code to include in the email.
     */
    public void sendResetCode(String toEmail, String code) {
        try {
            // Create a MIME-style email message
            MimeMessage message = mailSender.createMimeMessage();

            // Helper class makes it easier to set up the email content
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Set the recipient and subject line
            helper.setTo(toEmail);
            helper.setSubject("🔐 Your Password Reset Code");

            // Define the email body using HTML with inline styles
            String htmlContent = """
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #2c3e50;">Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>You requested to reset your password. Use the code below to continue:</p>
                        <div style="font-size: 24px; font-weight: bold; color: #e74c3c; margin: 20px 0;">%s</div>
                        <p>If you didn't request this, you can safely ignore this email.</p>
                        <p style="margin-top: 30px;">Thanks,<br><strong>Your App Team</strong></p>
                    </div>
                    """.formatted(code);

            // Set the HTML content in the email
            helper.setText(htmlContent, true);

            // Send the email
            mailSender.send(message);
        } catch (MessagingException e) {
            // Wrap and rethrow any email-related errors
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
