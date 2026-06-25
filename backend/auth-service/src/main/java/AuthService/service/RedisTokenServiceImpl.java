package AuthService.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisTokenServiceImpl implements RedisTokenService{

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String PREFIX = "pwd_reset:";
    private static final long EXPIRATION_MINUTES = 10;

    // Using two-way searching for Big O(1) that improves performance.
    @Transactional
    public void saveToken(String token, Long userId) {
        String tokenKey = PREFIX + token;
        String userKey = PREFIX + "user:" + userId;

        //Save with tow key
        redisTemplate.opsForValue().set(tokenKey, userId, EXPIRATION_MINUTES, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(userKey, token, EXPIRATION_MINUTES, TimeUnit.MINUTES);
    }

    @Transactional(readOnly = true)
    public Optional<Long> getUserIdByToken(String token) {
        String key = PREFIX + token;
        Object value = redisTemplate.opsForValue().get(key);
        return convertToLong(value);
    }

    @Transactional(readOnly = true)
    public Optional<String> getTokenByUserId(Long userId) {
        String key = PREFIX + "user:" + userId;
        Object value = redisTemplate.opsForValue().get(key);

        if (value == null) {
            return Optional.empty();
        }
        if (value instanceof String) {
            return Optional.of((String) value);
        }
        return Optional.of(value.toString());
    }

    @Transactional
    public void deleteTokenByUserId(Long userId) {
        Optional<String> tokenOpt = getTokenByUserId(userId);

        String userKey = PREFIX + "user:" + userId;
        redisTemplate.delete(userKey);

        tokenOpt.ifPresent(token -> {
            String tokenKey = PREFIX + token;
            redisTemplate.delete(tokenKey);
        });
    }

    @Transactional(readOnly = true)
    public boolean isTokenValid(String token) {
        String key = PREFIX + token;
        return redisTemplate.hasKey(key);
    }

    //Convert to Long
    private Optional<Long> convertToLong(Object value) {
        return switch (value) {
            case Long l -> Optional.of(l);
            case Integer i -> Optional.of(i.longValue());
            case String s -> {
                try {
                    yield Optional.of(Long.parseLong(s));
                } catch (NumberFormatException e) {
                    yield Optional.empty();
                }
            }
            case null, default -> Optional.empty();
        };
    }
}