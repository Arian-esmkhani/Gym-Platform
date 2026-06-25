package AuthService.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String username, String token);
    void sendPasswordChangedConfirmation(String to, String username);
}