package main.repository;

import main.dto.ExerciseDataDto;
import main.dto.ExerciseDto;

import java.util.List;

public interface ExerciseRepo {
    //For get all exercise with muscle name and pagination
    List<ExerciseDto> getByMuscleName(String name, int limit, int offset);
    Long countGetByMuscleName(String name);
    //For get exercise with id
    ExerciseDataDto getExercise(long exerciseID);
    //Searching with exercise or muscle name and pagination
    List<ExerciseDto> search(String name, int limit, int offset);
    Long countSearch(String name);
    //Sliders
    List<ExerciseDto> armSlider();
    List<ExerciseDto> legSlider();
    List<ExerciseDto> chestSlider();
    //Is for fining some suggest names
    List<String> searchName(String name);
}