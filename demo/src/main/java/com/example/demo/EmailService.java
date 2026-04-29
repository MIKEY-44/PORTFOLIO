package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String myEmail;

    public void sendContactEmail(String name, String senderEmail, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        
        // Automatically sends the message to your configured Gmail address
        mailMessage.setTo(myEmail); 
        
        mailMessage.setSubject("New Portfolio Contact from: " + name);
        mailMessage.setText(
            "Name: " + name + "\n" +
            "Email: " + senderEmail + "\n\n" +
            "Message:\n" + message
        );

        mailSender.send(mailMessage);
    }
}