package coach.repo;

import coach.dto.UserData;
import coach.dto.UserProgramDto;

import java.util.List;

public interface ProgramRepo {
    //Find that do not have program witch pagination
    List<UserData> findHaveNotProgramUsers(int limit, int offset);
    Long countHaveNot();
    //Search that do not have program witch pagination
    List<UserData> searchHaveNotProgramUsers(String name, int limit, int offset);
    Long countHaveNotSearch(String name);
    //Find that do have program witch pagination
    List<UserData> findHaveProgramUsers( int limit, int offset);
    Long countHave();
    //Search that do have program witch pagination
    List<UserData> searchHaveProgramUsers(String name, int limit, int offset);
    Long countHaveSearch(String name);
    //For user tabla title and day
    List<UserProgramDto> userDaysData(long userID);
}
