# API Gateway Service

Central entry point for the gym platform microservices architecture. Handles authentication, authorization, rate limiting, request routing, and circuit breaking for all downstream services.

## Tech Stack

- **Java** with Spring Cloud Gateway
- **Spring WebFlux**, **Spring Security Reactive**
- **JWT** (token validation)
- **Redis** (rate limiting)
- **Netflix Hystrix** (circuit breakers)
- **Maven**

## Key Features

- **JWT Authentication** – Validates tokens from HTTP-only cookies
- **Role-Based Access** – Separate filters for ADMIN and COACH roles
- **Rate Limiting** – Redis-based with different limits per endpoint type
- **Circuit Breakers** – Hystrix fallbacks for service failures
- **Request Routing** – Routes to 4 downstream services
- **Gateway Security** – Adds `X-Gateway-Key` header to all forwarded requests

## Service Endpoints & Ports

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 5000 | Entry point (not shown in code, assumed) |
| Auth Service | 5001 | Authentication & user management |
| Main Service | 5002 | Core user-facing API (coaches, exercises, profiles) |
| Admin Service | 5003 | Admin CRUD operations |
| Coach Service | 5004 | Coach panel operations |

## Route Categories & Authentication

### Public Endpoints (No Auth Required)
| Path Pattern | Methods |
|--------------|---------|
| `/api/auth/register` | POST |
| `/api/auth/login` | POST |
| `/api/coach/slider` | GET |
| `/api/coach/data/{id}` | GET |
| `/api/exercise/by-muscle/{name}` | GET |
| `/api/exercise/get/{id}` | GET |
| `/api/exercise/search/{name}` | GET |
| `/api/exercise/*-slider` | GET |

### User Endpoints (Any Authenticated User)
| Path Pattern | Methods |
|--------------|---------|
| `/api/coach/user` | GET |
| `/api/coach/add/user/{coachID}` | POST |
| `/api/profile/add` | POST |
| `/api/profile/get` | GET |
| `/api/program/get` | GET |

### Admin Endpoints (ADMIN Role Required)
| Path Pattern | Methods |
|--------------|---------|
| `/api/cache/*` | POST |
| `/api/coatch/*` | POST |
| `/api/exercise/add` | POST |
| `/api/exercise/update/{id}` | POST |
| `/api/exercise/delete/{id}` | POST |

### Coach Endpoints (COACH Role Required)
| Path Pattern | Methods |
|--------------|---------|
| `/api/exercise/add` (coach panel) | POST |
| `/api/exercise/delete` | POST |
| `/api/profile/add` (coach note) | POST |
| `/api/profile/get` (coach note) | GET |
| `/api/program/not*` | GET |
| `/api/program/have*` | GET |
| `/api/program/days-data` | GET |

## Rate Limiting Configuration

| Endpoint Type | Rate Limit | Key Resolver |
|---------------|------------|--------------|
| Public endpoints | 50 requests (burst 100) | Client IP address |
| User/Auth endpoints | 15 requests (burst 40) | X-User-ID header |
| Sensitive endpoints | 3 requests (burst 10) | X-User-ID header |

## Request Flow

1. **Request enters gateway** → Port 8080
2. **Authentication Filter**:
   - Extracts JWT from `jwt_token` cookie
   - Validates signature, expiration, issuer, audience
   - Adds `X-User-ID` and `X-User-ROLE` headers
3. **Role Filter** (if applicable):
   - `AdminRoleFilter` → Checks for `ADMIN` role
   - `CoachRoleFilter` → Checks for `COACH` role
4. **Rate Limiter** → Redis-based token bucket
5. **Circuit Breaker** → Hystrix with fallback
6. **Route Forwarding** → Adds `X-Gateway-Key` header

## Fallback Responses

When a downstream service is unavailable:
```json
{
  "status": 503,
  "message": "Service is temporarily unavailable. Please try again later."
}

## Headers Added by Gateway

Header	Source	Description
X-Gateway-Key	Gateway config	Internal service authentication
X-User-ID	JWT token	User identifier from token subject
X-User-ROLE	JWT token	User role (ADMIN/COACH/CUSTOMER)