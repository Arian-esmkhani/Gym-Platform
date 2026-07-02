package APIGatway.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.UriSpec;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;
import java.util.function.Function;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class GatewayConfig {

    private final AuthenticationFilter authenticationFilter;
    private final RedisRateLimiter redisRateLimiterForUsers;
    private final RedisRateLimiter redisRateLimiterForPublicEndpoints;
    private final AdminRoleFilter adminRoleFilter;
    private final CoachRoleFilter coachRoleFilter;

    public static final String AUTH_SERVICE = "http://localhost:5001";
    public static final String MAIN_SERVICE = "http://localhost:5002";
    public static final String ADMIN_SERVICE = "http://localhost:5003";
    public static final String COACH_SERVICE = "http://localhost:5004";

    private Mono<String> publicKeyResolver(ServerWebExchange exchange) {
        return Mono.just("public-ip-" + getClientIp(exchange));
    }

    private Mono<String> userKeyResolver(ServerWebExchange exchange) {
        String userId = exchange.getRequest()
                .getHeaders().getFirst("X-User-ID");
        return Mono.just("user-" + (userId != null ? userId : "anonymous"));
    }

    private String getClientIp(ServerWebExchange exchange) {
        InetSocketAddress remoteAddress = exchange.getRequest().getRemoteAddress();
        return remoteAddress != null ? remoteAddress.
                getAddress().getHostAddress() : "unknown";
    }

    // Helper methods
    private Function<GatewayFilterSpec, UriSpec> openEndpointFilter(
            String circuitBreakerName) {
        return f -> f
                .filter(authenticationFilter)
                .requestRateLimiter(config -> config
                        .setRateLimiter(redisRateLimiterForPublicEndpoints)
                        .setKeyResolver(this::publicKeyResolver)
                )
                .circuitBreaker(config -> config
                        .setName(circuitBreakerName)
                        .setFallbackUri("forward:/fallback/main-service")
                );
    }

    private Function<GatewayFilterSpec, UriSpec> userEndpointFilter(
            String circuitBreakerName) {
        return f -> f
                .filter(authenticationFilter)
                .requestRateLimiter(config -> config
                        .setRateLimiter(redisRateLimiterForUsers)
                        .setKeyResolver(this::userKeyResolver)
                )
                .circuitBreaker(config -> config
                        .setName(circuitBreakerName)
                        .setFallbackUri("forward:/fallback/main-service")
                );
    }

    private Function<GatewayFilterSpec, UriSpec> adminEndpointFilter(
            String circuitBreakerName) {
        return f -> f
                .filter(authenticationFilter)
                .filter(adminRoleFilter)
                .requestRateLimiter(config -> config
                        .setRateLimiter(redisRateLimiterForUsers)
                        .setKeyResolver(this::userKeyResolver)
                )
                .circuitBreaker(config -> config
                        .setName(circuitBreakerName)
                        .setFallbackUri("forward:/fallback/admin-service")
                );
    }

    private Function<GatewayFilterSpec, UriSpec> coachEndpointFilter(
            String circuitBreakerName) {
        return f -> f
                .filter(authenticationFilter)
                .filter(coachRoleFilter)
                .requestRateLimiter(config -> config
                        .setRateLimiter(redisRateLimiterForUsers)
                        .setKeyResolver(this::userKeyResolver)
                )
                .circuitBreaker(config -> config
                        .setName(circuitBreakerName)
                        .setFallbackUri("forward:/fallback/coach-service")
                );
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                // ==================== MAIN SERVICE ======================

                // Coach Controller Routes
                .route("coach-slider", r ->
                        r.path("/api/coach/slider")
                                .and().method("GET")
                                .filters(openEndpointFilter("coachSliderCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("coach-get-by-id", r ->
                        r.path("/api/coach/data/{id}")
                                .and().method("GET")
                                .filters(openEndpointFilter("coachGetByIdCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("coach-get-user", r ->
                        r.path("/api/coach/user")
                                .and().method("GET")
                                .filters(userEndpointFilter("coachGetUserCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("coach-add-user", r ->
                        r.path("/api/coach/add/user/{coachID}")
                                .and().method("POST")
                                .filters(userEndpointFilter("coachAddUserCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                // Exercise Controller Routes
                .route("exercise-by-muscle", r ->
                        r.path("/api/exercise/by-muscle/{name}")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseByMuscleCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-get-by-id", r ->
                        r.path("/api/exercise/get/{id}")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseGetByIdCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-search", r ->
                        r.path("/api/exercise/search/{name}")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseSearchCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-search-name", r ->
                        r.path("/api/exercise/search/name")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseSearchNameCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-arm-slider", r ->
                        r.path("/api/exercise/arm-slider")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseArmSliderCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-leg-slider", r ->
                        r.path("/api/exercise/leg-slider")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseLegSliderCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("exercise-chest-slider", r ->
                        r.path("/api/exercise/chest-slider")
                                .and().method("GET")
                                .filters(openEndpointFilter("exerciseChestSliderCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                // Profile Controller Routes
                .route("profile-add", r ->
                        r.path("/api/profile/add")
                                .and().method("POST")
                                .filters(userEndpointFilter("profileAddCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                .route("profile-get", r ->
                        r.path("/api/profile/get")
                                .and().method("GET")
                                .filters(userEndpointFilter("profileGetCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                // Program Controller Routes
                .route("program-get", r ->
                        r.path("/api/program/get")
                                .and().method("GET")
                                .filters(userEndpointFilter("programGetCircuitBreaker"))
                                .uri(MAIN_SERVICE))

                // ==================== AUTH SERVICE ======================

                .route("auth-login", r ->
                        r.path("/api/auth/login")
                                .and().method("POST")
                                .filters(openEndpointFilter("authLoginCircuitBreaker"))
                                .uri(AUTH_SERVICE))

                .route("auth-register", r ->
                        r.path("/api/auth/register")
                                .and().method("POST")
                                .filters(openEndpointFilter("authRegisterCircuitBreaker"))
                                .uri(AUTH_SERVICE))

                // ==================== ADMIN SERVICE ======================

                .route("cache-clear-all", r ->
                        r.path("/api/cache/clear-all")
                                .and().method("POST")
                                .filters(adminEndpointFilter("cacheClearAllCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("cache-clear-by-name", r ->
                        r.path("/api/cache/clear/{cacheName}")
                                .and().method("POST")
                                .filters(adminEndpointFilter("cacheClearByNameCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("coach-add-admin", r ->
                        r.path("/api/coatch/add")
                                .and().method("POST")
                                .filters(adminEndpointFilter("coachAddAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("coach-update-admin", r ->
                        r.path("/api/coatch/update/{id}")
                                .and().method("POST")
                                .filters(adminEndpointFilter("coachUpdateAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("coach-delete-admin", r ->
                        r.path("/api/coatch/delete/{id}")
                                .and().method("POST")
                                .filters(adminEndpointFilter("coachDeleteAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("exercise-add-admin", r ->
                        r.path("/api/exercise/add")
                                .and().method("POST")
                                .filters(adminEndpointFilter("exerciseAddAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("exercise-update-admin", r ->
                        r.path("/api/exercise/update/{id}")
                                .and().method("POST")
                                .filters(adminEndpointFilter("exerciseUpdateAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))

                .route("exercise-delete-admin", r ->
                        r.path("/api/exercise/delete/{id}")
                                .and().method("POST")
                                .filters(adminEndpointFilter("exerciseDeleteAdminCircuitBreaker"))
                                .uri(ADMIN_SERVICE))
                // ==================== COACH SERVICE (پورت 5004) ======================

                // Exercise Controller Routes (Coach Panel)
                .route("coach-exercise-add", r ->
                        r.path("/api/exercise/add")
                                .and().method("POST")
                                .filters(coachEndpointFilter("coachExerciseAddCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-exercise-delete", r ->
                        r.path("/api/exercise/delete")
                                .and().method("POST")
                                .filters(coachEndpointFilter("coachExerciseDeleteCircuitBreaker"))
                                .uri(COACH_SERVICE))

                // Profile Controller Routes (Coach Panel)
                .route("coach-profile-add-note", r ->
                        r.path("/api/profile/add")
                                .and().method("POST")
                                .filters(coachEndpointFilter("coachProfileAddNoteCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-profile-get-note", r ->
                        r.path("/api/profile/get")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProfileGetNoteCircuitBreaker"))
                                .uri(COACH_SERVICE))

                // Program Controller Routes (Coach Panel)
                .route("coach-program-not-have", r ->
                        r.path("/api/program/not")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProgramNotHaveCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-program-not-have-search", r ->
                        r.path("/api/program/not/search")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProgramNotHaveSearchCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-program-have", r ->
                        r.path("/api/program/have")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProgramHaveCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-program-have-search", r ->
                        r.path("/api/program/have/search")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProgramHaveSearchCircuitBreaker"))
                                .uri(COACH_SERVICE))

                .route("coach-program-days-data", r ->
                        r.path("/api/program/days-data")
                                .and().method("GET")
                                .filters(coachEndpointFilter("coachProgramDaysDataCircuitBreaker"))
                                .uri(COACH_SERVICE))
                .build();
    }
}