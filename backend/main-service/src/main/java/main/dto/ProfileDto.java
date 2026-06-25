package main.dto;

import java.time.LocalDateTime;

//For data that front profile need
public record ProfileDto(
        String phoneNumber,
        int age,
        double weight,
        double height,
        String size,
        String userNote,
        String coachNote,
        LocalDateTime createdAt
) {}