# Fitness Club Backend Service

Backend API for a gym management application, handling user profiles, exercise library, coaches, workout programs, and caching.

## Tech Stack

- **Java 21** with Spring Boot
- **Spring MVC, Data JPA, Data MongoDB, Cache, Async**
- **MySQL** (JPA) & **MongoDB** (user profiles)
- **Redis** (caching)
- **Maven** (build)

## Key Features

- **Exercise Library** – Paginated search/filter by muscle group, name suggestions, slider endpoints
- **Coach Management** – Assign coaches to users, view coach details
- **Personalized Programs** – Daily workout plans with movements and exercises
- **User Profiles** – Store profile data in MongoDB (phone, age, weight, notes)
- **Caching** – Redis-based (`static` cache TTL 5h, `user` cache TTL 20min)
- **Async Support** – Configurable thread pool for async operations
- **Gateway Security** – Filter that validates `X-Gateway-Key` header on every request

## Main Endpoints

| Module | Endpoint | Description |
|--------|----------|-------------|
| Coach | `GET /api/coach/slider` | List coaches |
| Coach | `GET /api/coach/data/{id}` | Coach details |
| Coach | `POST /api/coach/add/user/{coachID}` | Assign coach to user |
| Exercise | `GET /api/exercise/by-muscle/{name}` | Exercises by muscle (paginated) |
| Exercise | `GET /api/exercise/search/{name}` | Search exercises |
| Exercise | `GET /api/exercise/{muscle}-slider` | Slider for arm/leg/chest |
| Program | `GET /api/program/get?day=1` | User's daily program |
| Profile | `POST /api/profile/add` | Create profile |
| Profile | `GET /api/profile/get` | Get user profile |

## Configuration Highlights

- **Async Executor**: core pool 3, max 10, queue 50
- **Redis Cache**: default TTL 2h, overrides for `user` (20min) and `static` (5h)
- **Security Filter**: rejects requests without valid `X-Gateway-Key` header
- **Pagination**: 12 items/page for exercises, 1 item/page for programs (max day 7)

## Running the Service

1. Configure `application.properties` with:
   - PostgreSQL & MongoDB connection strings
   - Redis host/port
   - `gateway.secret.key` value

2. Build and run:
```bash
mvn clean package
java -jar target/*.jar

