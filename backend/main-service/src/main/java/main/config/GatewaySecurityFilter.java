package main.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class GatewaySecurityFilter implements Filter {

    @Value("${gateway.secret.key}")
    private String expectedGatewayKey;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String receivedKey = httpRequest.getHeader("X-Gateway-Key");

        if (!expectedGatewayKey.equals(receivedKey)) {
            httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
            httpResponse.getWriter().write("Direct access not allowed");
            return;
        }

        chain.doFilter(request, response);
    }
}