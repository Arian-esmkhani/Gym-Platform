package AuthService.service;

import AuthService.model.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByUsername(String username);
    void createPasswordResetTokenForUser(User user, String token);
    User validatePasswordResetToken(String token);
    void changeUserPassword(User user, String newPassword);
}