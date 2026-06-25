package main.repository;

import main.dto.ProgramDataDto;

public interface ProgramRepo {
    //User program
    ProgramDataDto getProgramData(long userID, int day);
    //For has nex and that exist
    Long countProgram(long userID);
}
