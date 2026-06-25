package main.service;

import main.dto.ExerciseDataDto;
import main.dto.ExerciseDto;
import main.dto.ExerciseResponse;

import java.util.List;

public interface ExerciseService {
    //For get all exercise with muscle name and pagination
    ExerciseResponse getByMuscleName(String name, Integer page);
    //For get exercise with id
    ExerciseDataDto getExercise(long exerciseID);
    //Searching with exercise or muscle name and pagination
    ExerciseResponse search(String name, Integer page);
    //Sliders
    List<ExerciseDto> armSlider();
    List<ExerciseDto> legSlider();
    List<ExerciseDto> chestSlider();
    //Is for fining some suggest names
    List<String> searchName(String name);
}