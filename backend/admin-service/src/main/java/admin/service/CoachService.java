package admin.service;

import admin.dto.CoachDataDto;

public interface CoachService {
    //Adding, Updating and Deleting Coach
    void addCoach(CoachDataDto coachDto);
    void updateCoach(CoachDataDto coachDto, Long coachID);
    void deleteCoach(Long coachID);
}
