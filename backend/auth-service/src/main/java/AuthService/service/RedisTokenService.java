package AuthService.service;

import java.util.Optional;

public interface RedisTokenService{
    void saveToken(String token, Long userId);
    Optional<String> getTokenByUserId(Long userId);
    void deleteTokenByUserId(Long userId);
    boolean isTokenValid(String token);
}
