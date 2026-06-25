package AuthService.controller;

import AuthService.dto.*;
import AuthService.model.User;
import AuthService.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        //Validate user password
        Optional<User> user = authService.validateUser(request.username(), request.password());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Invalid credentials", null));
        }

        //Generate JWT token
        String token = authService.generateToken(user.get(), request.rememberMe());

        Cookie cookie = new Cookie("jwt_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setAttribute("SameSite", "Lax");
        cookie.setPath("/");
        int maxAgeSeconds = request.rememberMe() ?
                (int) Duration.ofDays(30).getSeconds() :
                (int) Duration.ofHours(1).getSeconds();
        cookie.setMaxAge(maxAgeSeconds);
        response.addCookie(cookie);

        //Response with user userName for welcome
        String username = user.get().getUsername();
        return ResponseEntity.ok(new AuthResponse("Login successful", username));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody SaveUserDto saveUserDto) {
        try {
            authService.saveUser(
                    saveUserDto.username(),
                    saveUserDto.password(),
                    saveUserDto.email()
            );
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "successfully",
                            null
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.error(e.getMessage())
            );
        }
    }
}