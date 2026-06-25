package coach.service;

import coach.dto.AddProgramReq;
import coach.model.Exercise;
import coach.model.ExerciseProgram;
import coach.model.Movement;
import coach.model.User;
import coach.repo.ExerciseProgramRepo;
import coach.repo.ExerciseRepo;
import coach.repo.MovementRepo;
import coach.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService{
    private static final String REPEAT = "10-15";
    private static final Integer SET = 3;

    private final ExerciseProgramRepo exerciseProgramRepo;
    private final ExerciseRepo exerciseRepo;
    private final UserRepo userRepo;
    private final MovementRepo movementRepo;

    @Override
    @Transactional(timeout = 7)
    public void addProgram(AddProgramReq req)  {

        Optional<User> optionalUser = userRepo.findById(req.userId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User user = optionalUser.get();

        List<Exercise> exerciseList = exerciseRepo.findAllById(req.exerciseID());

        List<Movement> movements = new ArrayList<>();

        for (Exercise exercise : exerciseList) {
            Movement movement = Movement.builder()
                    .repeat(REPEAT)
                    .set(SET)
                    .exercise(exercise)
                    .build();
            movements.add(movement);
        }

        movementRepo.saveAll(movements);

        ExerciseProgram program = ExerciseProgram.builder().day(req.day()).note(req.note())
                .title(req.title()).user(user).movements(movements).build();

        exerciseProgramRepo.save(program);
    }

    @Override
    @Transactional(timeout = 6)
    public void deleteProgram(long exerciseProgramID) {

        Optional<ExerciseProgram> optionalExerciseProgram = exerciseProgramRepo
                .findById(exerciseProgramID);
        if (optionalExerciseProgram.isEmpty()) {
            throw new IllegalArgumentException("Exercise Program not found");
        }

        ExerciseProgram exerciseProgram = optionalExerciseProgram.get();
        exerciseProgram.setDeletedAt(LocalDateTime.now());

        List<Movement> movementList = exerciseProgram.getMovements();
        movementList.forEach(
                movement ->  movement.setDeletedAt(LocalDateTime.now()));
    }
}
