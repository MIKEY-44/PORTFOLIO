package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // Allows your frontend to communicate with this backend
public class ContactController {

    @Autowired
    private EmailService emailService;

    // This handles people visiting your Render URL in their browser
    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Portfolio Backend is up and running! Ready to receive messages.");
    }

    @PostMapping("/api/contact")
    public ResponseEntity<String> sendEmail(@RequestBody ContactRequest request) {
        try {
            emailService.sendContactEmail(request.getName(), request.getEmail(), request.getMessage());
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to send email.");
        }
    }
}

// DTO (Data Transfer Object) to map the incoming JSON
class ContactRequest {
    private String name;
    private String email;
    private String message;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}