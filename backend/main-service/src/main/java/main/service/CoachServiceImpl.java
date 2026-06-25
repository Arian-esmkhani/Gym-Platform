package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.CoachDataDto;
import main.dto.CoachDto;
import main.dto.UserCoachDto;
import main.model.Coach;
import main.model.User;
import main.repository.CoachRepo;
import main.repository.UserRepo;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CoachServiceImpl implements CoachService{

    private final CoachRepo coachRepo;
    private final UserRepo userRepo;

    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'coachSlider'")
    @Override
    public List<CoachDto> getCoaches() {
        return coachRepo.getCoaches();
    }

    @Transactional(readOnly = true, timeout = 3)
    @Override
    public CoachDataDto getCoachData(long id) {
        return coachRepo.getCoachData(id);
    }

    @Override
    @Transactional(timeout = 5)
    public void addUserCoach(long userID, long coachID) {
        Optional<Coach> optionalCoach = coachRepo.findById(coachID);
        if (optionalCoach.isEmpty()) {
            throw new IllegalArgumentException("Coach not found for adding user coach");
        }

        Optional<User> optionalUser = userRepo.findById(userID);
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found for adding user coach");
        } else {
            User user = optionalUser.get();
            user.setCoach(optionalCoach.get());
            user.setUpdateAt(LocalDateTime.now());
        }
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    public UserCoachDto getUserCoach(long userID) {
        return coachRepo.getUserCoach(userID).orElse(null);
    }
}
