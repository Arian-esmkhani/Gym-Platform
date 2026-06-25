package coach.repo;

import coach.dto.UserData;
import coach.dto.UserProgramDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class JpaProgramRepo implements ProgramRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserData> findHaveNotProgramUsers( int limit, int offset) {
        try {
            TypedQuery<UserData> query = entityManager.createQuery("""
                    SELECT NEW coach.dto.UserData(
                        u.name, u.id)
                    FROM User u WHERE u.deletedAt IS null AND
                    u.coach IS null ORDER BY createAt ASC
                    """, UserData.class);
            return query.setFirstResult(offset)
                    .setMaxResults(limit)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Long countHaveNot() {
        return entityManager.createQuery(
                """
                SELECT COUNT(u)
                FROM User u
                WHERE u.deletedAt IS null AND
                u.coach IS null
                """, Long.class).getSingleResult();
    }

    @Override
    public List<UserData> searchHaveNotProgramUsers(String name, int limit, int offset) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT NEW main.dto.ExerciseDto(
                        u.id, u.name)
            FROM User u
            WHERE u.deletedAt IS NULL AND
            u.coach IS null
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))");
                parameters.put("name", name.trim());
            }

            TypedQuery<UserData> query = entityManager
                    .createQuery(jpql.toString(), UserData.class);

            parameters.forEach(query::setParameter);

            return query
                    .setFirstResult(offset)
                    .setMaxResults(limit)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Long countHaveNotSearch(String name) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT COUNT(u)
            FROM User e
            WHERE u.deletedAt IS NULL AND
            u.coach IS null
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))");
                parameters.put("name", name.trim());
            }

            TypedQuery<Long> query = entityManager
                    .createQuery(jpql.toString(), Long.class);

            parameters.forEach(query::setParameter);

            return query.getSingleResult();

        } catch (NoResultException e) {
            return 0L;
        } catch (RuntimeException e) {
            throw new RuntimeException("Count failed", e);
        }
    }

    @Override
    public List<UserData> findHaveProgramUsers( int limit, int offset) {
        try {
            TypedQuery<UserData> query = entityManager.createQuery("""
                    SELECT NEW coach.dto.UserData(
                        u.name, u.id)
                    FROM User u WHERE u.deletedAt IS null AND
                    u.coach IS NOT null ORDER BY createAt ASC
                    """, UserData.class);
            return query.setFirstResult(offset)
                    .setMaxResults(limit)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Long countHave() {
        return entityManager.createQuery(
                """
                SELECT COUNT(u)
                FROM User u
                WHERE u.deletedAt IS null AND
                u.coach IS NOT null
                """, Long.class).getSingleResult();
    }

    @Override
    public List<UserData> searchHaveProgramUsers(String name, int limit, int offset) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT NEW main.dto.ExerciseDto(
                        u.id, u.name)
            FROM User u
            WHERE u.deletedAt IS NULL AND
            u.coach IS Not null
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))");
                parameters.put("name", name.trim());
            }

            TypedQuery<UserData> query = entityManager
                    .createQuery(jpql.toString(), UserData.class);

            parameters.forEach(query::setParameter);

            return query
                    .setFirstResult(offset)
                    .setMaxResults(limit)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Long countHaveSearch(String name) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT COUNT(u)
            FROM User e
            WHERE u.deletedAt IS NULL AND
            u.coach IS NOT null
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))");
                parameters.put("name", name.trim());
            }

            TypedQuery<Long> query = entityManager
                    .createQuery(jpql.toString(), Long.class);

            parameters.forEach(query::setParameter);

            return query.getSingleResult();

        } catch (NoResultException e) {
            return 0L;
        }
    }

    @Override
    public List<UserProgramDto> userDaysData(long userID) {
        try {
            TypedQuery<UserProgramDto> query = entityManager.createQuery("""
                    SELECT NEW coach.dto.UserProgramDto(
                        e.day, e.titel)
                    FROM ExerciseProgram e
                    WHERE e.user.id = :id
                    ORDER BY createAt ASC
                    """, UserProgramDto.class);
            return query.setParameter("id", userID).getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }
}
