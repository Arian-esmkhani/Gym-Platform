# Admin Panel Backend Service

Backend API for administrators to manage coaches, exercises, and Redis cache. Provides full CRUD operations with soft delete support and automatic cache eviction.

## Tech Stack

- **Java 21** with Spring Boot
- **Spring MVC, Data JPA, Cache**
- **MySQL** (data storage)
- **Redis** (caching)
- **Maven**

## Key Features

- **Coach Management** – Create, update, and delete coaches (soft delete)
- **Exercise Management** – Create, update, and delete exercises (soft delete)
- **Cache Management** – Clear all caches or specific cache by name
- **Automatic Cache Eviction** – Coach updates/deletes automatically clear `static` cache
- **Soft Delete Pattern** – Data preserved with `deletedAt` timestamp
- **Async Support** – Thread pool for async operations
- **Redis Caching** – `user` cache TTL 20min, `static` cache TTL 5h

## Main Endpoints

### Coach Management (`/api/coatch`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/coatch/add` | Create a new coach |
| `POST` | `/api/coatch/update/{id}` | Update existing coach |
| `POST` | `/api/coatch/delete/{id}` | Soft-delete coach |

### Exercise Management (`/api/exercise`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/exercise/add` | Create a new exercise |
| `POST` | `/api/exercise/update/{id}` | Update existing exercise |
| `POST` | `/api/exercise/delete/{id}` | Soft-delete exercise |

### Cache Management (`/api/cache`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cache/clear-all` | Clear all Redis caches |
| `POST` | `/api/cache/clear/{cacheName}` | Clear specific cache by name |