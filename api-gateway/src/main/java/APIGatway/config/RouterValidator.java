package APIGatway.config;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

//Validator to determine which routes are secured.
@Component
public class RouterValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/coach/slider",
            "/api/coach/data",
            "/api/exercise/by-muscle/",
            "/api/exercise/get/",
            "/api/exercise/search/",
            "/api/exercise/arm-slider",
            "/api/exercise/leg-slider",
            "/api/exercise/chest-slider"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> {
                        String requestPath = request.getURI().getPath();

                        return requestPath.equals(uri) ||
                                requestPath.startsWith(uri.endsWith("/") ? uri : uri + "/");
                    });
}