package AuthService.service;

import AuthService.model.User;
import AuthService.Repository.UserRepository;
import AuthService.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Optional;

//Service created for doing the login and register need
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional(readOnly = true)
    public Optional<User> validateUser(String username, String password) {
        if (username == null || password == null) {
            throw new IllegalArgumentException("All fields are required");
        }

        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }

    @Transactional
    public void saveUser(String username, String password, String email) {
        if (username == null || username.trim().isEmpty() ||
                password == null || password.trim().isEmpty() ||
                email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Username, password and email are required");
        }

        String trimmedUsername = username.trim();
        String trimmedEmail = email.trim().toLowerCase(); // normalize email

        if (userRepository.existsByUsername(trimmedUsername)) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.existsByEmail(trimmedEmail)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(trimmedUsername);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(trimmedEmail);
        user.setRole(CustomRole.CUSTOMER.getValue());

        userRepository.save(user);
    }

    //Generate token that will being chek in API gateway
    public String generateToken(User user, boolean rememberMe) {
        if (user == null) {
            throw new IllegalArgumentException("All fields are required");
        }

        long expirationMs = rememberMe ?
                Duration.ofDays(30).toMillis() :
                Duration.ofHours(2).toMillis();
        return jwtUtil.generateToken(user, expirationMs);
    }
}
