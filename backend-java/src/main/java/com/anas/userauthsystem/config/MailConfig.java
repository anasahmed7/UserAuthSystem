package com.anas.userauthsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    /**
     * Configures the JavaMailSender bean used to send emails via Gmail SMTP.
     *
     * @return JavaMailSender configured with Gmail SMTP settings.
     */
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        // Set up Gmail SMTP server
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        // Use your Gmail account credentials (App password recommended)
        mailSender.setUsername("reset.pass.1120@gmail.com");
        mailSender.setPassword("qebp kwfc mfpb txjx"); // App-specific password, not your main password

        // Set additional mail properties
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");               // Protocol to use
        props.put("mail.smtp.auth", "true");                        // Enable authentication
        props.put("mail.smtp.starttls.enable", "true");             // Enable STARTTLS for secure connection
        props.put("mail.smtp.starttls.required", "true");           // Require STARTTLS
        props.put("mail.smtp.connectiontimeout", "5000");           // Connection timeout in ms
        props.put("mail.smtp.timeout", "5000");                     // Read timeout
        props.put("mail.smtp.writetimeout", "5000");                // Write timeout
        props.put("mail.debug", "true");                            // Enable debug output to logs

        return mailSender;
    }
}
