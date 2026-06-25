package AuthService.controller;

import AuthService.dto.ForgotPasswordRequest;
import AuthService.dto.PasswordResetRequest;
import AuthService.model.User;
import AuthService.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class PasswordResetController {

    private final UserService userService;

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        Optional<User> userOpt = userService.findByUsername(request.username());
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody @Valid PasswordResetRequest request) {
        User user = userService.validatePasswordResetToken(request.token());
        userService.changeUserPassword(user, request.newPassword());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken(@RequestParam String token) {
        userService.validatePasswordResetToken(token);
        return ResponseEntity.ok().build();
    }
}