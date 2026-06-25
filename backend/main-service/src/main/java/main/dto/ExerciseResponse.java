package main.dto;

import java.util.List;

//For search and all exercise with muscle
public record ExerciseResponse(
        boolean hasNext,
        List<ExerciseDto> exercises
) {}
