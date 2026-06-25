package main.dto;

public record ProgramResponse(
        ProgramDataDto programDataDto,
        boolean hasNext
) {}
