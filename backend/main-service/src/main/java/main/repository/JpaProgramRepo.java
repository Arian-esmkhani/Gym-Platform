package main.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import main.dto.MovementInfo;
import main.dto.ProgramDataDto;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class JpaProgramRepo implements ProgramRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public ProgramDataDto getProgramData(long userID, int day) {
        String sql = """
            SELECT
                ep.title,
                ep.note,
                m.repeat,
                m.set,
                e.id,
                e.name
            FROM exercise_program ep
            LEFT JOIN program_movement pm ON ep.id = pm.exercise_program_id
            LEFT JOIN movement m ON pm.movement_id = m.id AND m.deleted_at IS NULL
            LEFT JOIN exercise e ON m.exercise_id = e.id
            WHERE ep.user_id = :userId
            AND ep.day = :day
            AND ep.deleted_at IS NULL
            ORDER BY m.id
            """;

        @SuppressWarnings("unchecked")
        List<Object[]> results = entityManager.createNativeQuery(sql)
                .setParameter("userId", userID)
                .setParameter("day", day)
                .getResultList();

        if (results.isEmpty()) {
            throw new NoResultException("Program not found");
        }

        Object[] firstRow = results.getFirst();
        String title = (String) firstRow[0];
        String note = (String) firstRow[1];

        List<MovementInfo> movements = results.stream()
                .filter(row -> row[2] != null)
                .map(row -> new MovementInfo(
                        (String) row[2],//repeat
                        ((Number) row[3]).intValue(),//set
                        ((Number) row[4]).longValue(),//exerciseID
                        (String) row[5]//exerciseName
                ))
                .toList();

        return new ProgramDataDto(title, note, movements);
    }

    @Override
    public Long countProgram(long userID) {
        return entityManager.createQuery(
                """
                SELECT COUNT(e)
                FROM ExerciseProgram e
                WHERE e.deletedAt IS NULL
                AND ep.user_id = :userId
                """, Long.class).setParameter("userId", userID).getSingleResult();
    }
}
