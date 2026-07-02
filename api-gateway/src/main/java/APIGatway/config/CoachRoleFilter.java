package APIGatway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class CoachRoleFilter implements GatewayFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String role = exchange.getRequest().getHeaders().getFirst("X-User-Role");
        String path = exchange.getRequest().getPath().toString();

        if (role == null) {
            log.warn("Coach access denied - Role header missing for path: {}", path);
            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }

        if (!"COACH".equalsIgnoreCase(role)) {
            log.warn("Coach access denied - User role: {}, Path: {}", role, path);
            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }

        log.debug("Coach access granted - Path: {}", path);
        return chain.filter(exchange);
    }
}
