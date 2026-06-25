package AuthService.service;

import AuthService.Repository.UserRepository;
import AuthService.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RedisTokenServiceImpl redisTokenService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        redisTokenService.deleteTokenByUserId(user.getId());
        redisTokenService.saveToken(token, user.getId());
        emailService.sendPasswordResetEmail(user.getEmail(), user.getUsername(), token);
    }

    @Override
    public User validatePasswordResetToken(String token) {
        if (!redisTokenService.isTokenValid(token)) {
            throw new IllegalArgumentException("Invalid reset token");
        }

        Optional<Long> userIdOpt = redisTokenService.getUserIdByToken(token);
        if (userIdOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid password reset token");
        }

        Optional<User> userOpt = userRepository.findById(userIdOpt.get());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found for this token");
        }

        return userOpt.get();
    }

    @Transactional
    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the used token
        redisTokenService.deleteTokenByUserId(user.getId());
        // Sending confirmation
        emailService.sendPasswordChangedConfirmation(user.getEmail(), user.getUsername());
    }
}