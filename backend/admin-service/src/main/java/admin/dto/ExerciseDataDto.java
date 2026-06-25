package admin.dto;

public record ExerciseDataDto(
        String name,
        String description,
        String imgUrl,
        String gifUrl,
        String muscle
) {}