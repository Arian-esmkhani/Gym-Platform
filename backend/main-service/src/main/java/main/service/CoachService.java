package main.service;

import main.dto.CoachDataDto;
import main.dto.CoachDto;
import main.dto.UserCoachDto;

import java.util.List;

public interface CoachService {
    //Getting coaches for coach slider
    List<CoachDto> getCoaches();
    //Getting coach data with id
    CoachDataDto getCoachData(long id);
    //Adding coach for user
    void addUserCoach(long userID, long coachID);
    //Getting user coach data can be null
    UserCoachDto getUserCoach(long userID);
}
