package main.dto;

//For getting the movement info of the program ech day
public record MovementInfo(
        String repeat, int set, long exerciseID, String exerciseName
) {}
