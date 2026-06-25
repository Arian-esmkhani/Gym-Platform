package coach.repo;

import coach.model.ExerciseProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseProgramRepo extends JpaRepository<ExerciseProgram, Long> {
}
