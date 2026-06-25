package coach.service;

import coach.dto.UserDataResponse;
import coach.dto.UserProgramDto;

import java.util.List;

public interface ProgramService {
    //Find that do not have program witch pagination
    UserDataResponse findHaveNotProgramUsers(Integer page);
    //Search that do not have program witch pagination
    UserDataResponse searchHaveNotProgramUsers(Integer page, String name);
    //Find that do have program witch pagination
    UserDataResponse findHaveProgramUsers(Integer page);
    //Search that do have program witch pagination
    UserDataResponse searchHaveProgramUsers(Integer page, String name);
    //For user tabla title and day
    List<UserProgramDto> userDaysData(long userID);
}
