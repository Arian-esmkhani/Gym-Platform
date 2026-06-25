package coach.service;

import coach.dto.AddProgramReq;

public interface ExerciseService {
    //Adding program for user
    void addProgram(AddProgramReq req);
    //Deleting program
    void deleteProgram(long exerciseProgramID);
}
