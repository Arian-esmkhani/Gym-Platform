package main.dto;

import java.util.List;

//For Get user program
public record ProgramDataDto(
        String title, String note, List<MovementInfo> movements
) {}
