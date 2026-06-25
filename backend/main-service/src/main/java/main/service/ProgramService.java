package main.service;

import main.dto.ProgramResponse;

public interface ProgramService {
    //User program
    ProgramResponse getProgramData(long userID, Integer day);
}