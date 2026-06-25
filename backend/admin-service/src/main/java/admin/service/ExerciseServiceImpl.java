package admin.service;

import admin.dto.ExerciseDataDto;
import admin.model.Exercise;
import admin.repository.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService{

    private final ExerciseRepo exerciseRepo;

    @Transactional(timeout = 7)
    @Override
    public void addExercise(ExerciseDataDto exercise) {
        exerciseRepo.save(Exercise.builder()
                .name(exercise.name())
                .description(exercise.description())
                .imgUrl(exercise.imgUrl())
                .gifUrl(exercise.gifUrl())
                .muscle(exercise.muscle()).build());
    }

    @Transactional(timeout = 7)
    @Override
    public void updateExercise(ExerciseDataDto exerciseDto, long id) {

        Optional<Exercise> optionalExercise = exerciseRepo.findById(id);
        if (optionalExercise.isEmpty()) {
            log.debug("Exercise is not exist when updating");
            throw new IllegalArgumentException("Exercise is not exist when updating");
        }

        Exercise exercise = optionalExercise.get();
        exercise.setName(exerciseDto.name());
        exercise.setDescription(exerciseDto.description());
        exercise.setImgUrl(exerciseDto.imgUrl());
        exercise.setGifUrl(exerciseDto.gifUrl());
        exercise.setMuscle(exerciseDto.muscle());
        exercise.setUpdatedAt(LocalDateTime.now());
    }

    @Transactional(timeout = 7)
    @Override
    public void deleteExercise(long id) {

        Optional<Exercise> optionalExercise = exerciseRepo.findById(id);
        if (optionalExercise.isEmpty()) {
            log.debug("Exercise is not exist when deleting");
            throw new IllegalArgumentException("Exercise is not exist when deleting");
        }

        Exercise exercise = optionalExercise.get();
        exercise.setDeletedAt(LocalDateTime.now());
    }
}
