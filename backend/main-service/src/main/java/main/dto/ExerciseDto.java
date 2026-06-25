package main.dto;

import java.io.Serializable;

//For showing exercise data in cart
public record ExerciseDto(
        Long id,
        String name,
        String imgUrl,
        String muscle
) implements Serializable {}
