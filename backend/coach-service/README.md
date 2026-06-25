# Coach Panel Backend Service

Backend API for coaches and administrators to manage user programs, assign exercises, view user lists, and add coach notes.

## Tech Stack

- **Java 21** with Spring Boot
- **Spring MVC, Data JPA, Data MongoDB, Cache**
- **MySQL** (JPA) & **MongoDB** (coach notes)
- **Redis** (caching)
- **Maven**

## Key Features

- **Program Management** – Create workout programs for users (day, title, note, exercises)
- **Program Deletion** – Soft-delete programs and associated movements
- **User Filtering** – Paginated lists of users with/without programs
- **User Search** – Search users by name (with/without programs)
- **User Program Overview** – View all program days & titles for a specific user
- **Coach Notes** – Add and retrieve coach notes for user profiles
- **Redis Caching** – Caches user counts (`program` cache TTL 25min, `static` TTL 5h)
- **Async Support** – Thread pool for async operations

## Main Endpoints

| Module | Endpoint | Description |
|--------|----------|-------------|
| Exercise| `POST /api/exercise/add` | Create a program for a user (day, title, note, exercises) |
| Exercise| `POST /api/exercise/delete?exerciseProgramID=` | Soft-delete a program |
| Profile | `POST /api/profile/add?note=` | Add a coach note |
| Profile | `GET /api/profile/get?userID=` | Get coach note for a user |
| Program | `GET /api/program/not?page=` | List users **without** programs (paginated) |
| Program | `GET /api/program/not/search?page=&name=` | Search users without programs |
| Program | `GET /api/program/have?page=` | List users **with** programs (paginated) |
| Program | `GET /api/program/have/search?page=&name=` | Search users with programs |
| Program | `GET /api/program/days-data?userID=` | Get all program days & titles for a user |

