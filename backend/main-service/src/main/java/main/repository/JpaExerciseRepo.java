package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import main.dto.ExerciseDataDto;
import main.dto.ExerciseDto;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class JpaExerciseRepo implements ExerciseRepo{

    @PersistenceContext
    private EntityManager entityManager;

    private static final int STATIC_LIMIT = 10;
    private static final String ARM = "Arms";
    private static final String LEG = "Legs";
    private static final String CHEST = "Chest";

    @Override
    public List<ExerciseDto> getByMuscleName(String name, int limit, int offset) {
        TypedQuery<ExerciseDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.ExerciseDto(
                        e.id, e.name, e.imgUrl,
                        e.muscle)
                    FROM Exercise e
                    WHERE e.deletedAt IS NULL AND
                    LOWER(e.muscle) = LOWER(:name)
                    ORDER BY e.id ASC
                    """, ExerciseDto.class);
        return query.setFirstResult(offset)
                .setMaxResults(limit)
                .setParameter("name", name)
                .getResultList();
    }

    @Override
    public Long countGetByMuscleName(String name) {
        return entityManager.createQuery(
                """
                SELECT COUNT(e)
                FROM Exercise e
                WHERE e.deletedAt IS NULL
                AND LOWER(e.muscle) = LOWER(:name)
                """, Long.class).setParameter("name", name).getSingleResult();
    }

    @Override
    public ExerciseDataDto getExercise(long exerciseID) {
        TypedQuery<ExerciseDataDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.ExerciseDataDto(
                        e.name, e.muscle, e.gifUrl,
                        e.description)
                    FROM Exercise e
                    WHERE e.id = :exerciseID
                    """, ExerciseDataDto.class);
        return query
                .setParameter("exerciseID", exerciseID)
                .getSingleResult();
    }

    @Override
    public List<ExerciseDto> search(String name, int limit, int offset) {

        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT NEW main.dto.ExerciseDto(
                        e.id, e.name, e.imgUrl,
                        e.muscle)
            FROM Exercise e
            WHERE e.deletedAt IS NULL
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(e.muscle) LIKE LOWER(CONCAT('%', :name, '%')))");
                parameters.put("name", name.trim());
            }

            TypedQuery<ExerciseDto> query = entityManager
                    .createQuery(jpql.toString(), ExerciseDto.class);

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
    public Long countSearch(String name) {
        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT COUNT(e)
            FROM Exercise e
            WHERE e.deletedAt IS NULL
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))" +
                        "OR LOWER(e.muscle) LIKE LOWER(CONCAT('%', :name, '%')))");
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
    public List<ExerciseDto> armSlider() {
        try {
            TypedQuery<ExerciseDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.ExerciseDto(
                        e.id, e.name, e.imgUrl,
                        e.muscle)
                    FROM Exercise e
                    WHERE e.deletedAt IS NULL AND
                    LOWER(e.muscle) LIKE CONCAT('%', TRIM(:name), '%')
                    """, ExerciseDto.class);
            return query.setMaxResults(STATIC_LIMIT)
                    .setParameter("name", ARM)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ExerciseDto> legSlider() {
        try {
            TypedQuery<ExerciseDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.ExerciseDto(
                        e.id, e.name, e.imgUrl,
                        e.muscle)
                    FROM Exercise e
                    WHERE e.deletedAt IS NULL AND
                    LOWER(e.muscle) LIKE CONCAT('%', TRIM(:name), '%')
                    """, ExerciseDto.class);
            return query.setMaxResults(STATIC_LIMIT)
                    .setParameter("name", LEG)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<ExerciseDto> chestSlider() {
        try {
            TypedQuery<ExerciseDto> query = entityManager.createQuery("""
                    SELECT NEW main.dto.ExerciseDto(
                        e.id, e.name, e.imgUrl,
                        e.muscle)
                    FROM Exercise e
                    WHERE e.deletedAt IS NULL AND
                    LOWER(e.muscle) LIKE CONCAT('%', TRIM(:name), '%')
                    """, ExerciseDto.class);
            return query.setMaxResults(STATIC_LIMIT)
                    .setParameter("name", CHEST)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<String> searchName(String name) {

        try {
            StringBuilder jpql = new StringBuilder("""
            SELECT e.name
            FROM Exercise e
            WHERE e.deletedAt IS NULL
            """);

            Map<String, Object> parameters = new HashMap<>();

            if (name != null && !name.trim().isEmpty()) {
                jpql.append(" AND (LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))");
                parameters.put("name", name.trim());
            }

            TypedQuery<String> query = entityManager
                    .createQuery(jpql.toString(), String.class);

            parameters.forEach(query::setParameter);

            return query
                    .setMaxResults(STATIC_LIMIT)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }
}
