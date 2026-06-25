package AuthService.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.core.env.Environment;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final Environment env;

    @Value("${app.gateway-url}")
    private String gatewayUrl;

    @Value("${app.name:GameLand}")
    private String appName;

    @Value("${spring.mail.from}")
    private String fromEmail;

    @Async
    @Override
    public void sendPasswordResetEmail(String to, String username, String token) {
        try {
            String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
            String resetUrl = String.format("%s/api/auth/reset-password?token=%s",
                    gatewayUrl, encodedToken);

            Context context = new Context();
            context.setVariable("username", username);
            context.setVariable("resetUrl", resetUrl);
            context.setVariable("appName", appName);

            String htmlContent = templateEngine.process(
                    "email/reset", context);

            sendEmail(to, "Password Reset - " + appName, htmlContent);

        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", to, e);
            throw new MailSendException("Failed to send password reset email", e);
        }
    }

    @Async
    @Override
    public void sendPasswordChangedConfirmation(String to, String username) {
        try {
            Context context = new Context();
            context.setVariable("username", username);
            context.setVariable("appName", appName);

            String htmlContent = templateEngine.process(
                    "email/changed", context);

            sendEmail(to, "Password Changed - " + appName, htmlContent);

        } catch (Exception e) {
            log.error("Failed to send password changed confirmation to: {}", to, e);
            throw new MailSendException("Failed to send password changed confirmation", e);
        }
    }

    private void sendEmail(String to, String subject, String htmlContent)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setFrom(fromEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }
}