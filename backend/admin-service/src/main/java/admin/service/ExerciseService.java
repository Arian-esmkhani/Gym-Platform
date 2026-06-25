package admin.service;

import admin.dto.ExerciseDataDto;

public interface ExerciseService {
    //Adding, Updating and Deleting Exercise
    void addExercise(ExerciseDataDto exercise);
    void updateExercise(ExerciseDataDto exercise, long id);
    void deleteExercise(long id);
}
