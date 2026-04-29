package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String name, String senderEmail, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        
        // The email address where YOU want to receive the messages
        mailMessage.setTo("your-email@gmail.com"); 
        
        mailMessage.setSubject("New Portfolio Contact from: " + name);
        mailMessage.setText(
            "Name: " + name + "\n" +
            "Email: " + senderEmail + "\n\n" +
            "Message:\n" + message
        );

        mailSender.send(mailMessage);
    }
}