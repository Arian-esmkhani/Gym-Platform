# Authentication Service

Centralized authentication and authorization service for the gym platform. Handles user registration, login, JWT token generation, password reset with email notifications, and Redis-based token management.

## Tech Stack

- **Java 21** with Spring Boot
- **Spring Security**, **Spring Data JPA**, **Spring Mail**
- **MySQL** (user storage)
- **Redis** (password reset tokens, caching)
- **JWT** (token generation)
- **Thymeleaf** (email templates)
- **Maven**

## Key Features

- **User Registration** – Create new accounts with username, password, and email
- **User Login** – Validate credentials and issue JWT tokens
- **JWT Tokens** – Tokens stored in HTTP-only cookies (1h default / 30 days with "Remember Me")
- **Password Reset Flow** – Token-based password recovery with email
- **Email Notifications** – Async email sending using Thymeleaf templates
- **Redis Token Storage** – O(1) bidirectional token lookup with 10-minute TTL
- **Gateway Security Filter** – Validates `X-Gateway-Key` header on all requests
- **BCrypt Password Encoding** – Secure password storage

## Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login` | Authenticate and receive JWT cookie |
| `POST` | `/api/auth/forgot-password` | Request password reset email |
| `POST` | `/api/auth/reset-password` | Reset password using token |
| `GET` | `/api/auth/validate-token?token=` | Validate reset token |

## Request/Response Examples