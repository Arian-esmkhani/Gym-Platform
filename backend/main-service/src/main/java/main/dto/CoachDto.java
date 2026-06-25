package main.dto;

import java.io.Serializable;

//Coach slider data
public record CoachDto(
        Long id,
        String name,
        String imgUrl
) implements Serializable {}
