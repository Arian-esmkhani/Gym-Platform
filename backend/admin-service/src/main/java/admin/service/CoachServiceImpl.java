package admin.service;

import admin.dto.CoachDataDto;
import admin.model.Coach;
import admin.repository.CoachRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CoachServiceImpl implements CoachService{
    private final CoachRepo coachRepo;

    @Transactional(timeout = 7)
    @Override
    @CacheEvict(value = "static", key = "'coachSlider'")
    public void addCoach(CoachDataDto coachDto) {
        coachRepo.save(Coach.builder()
                .name(coachDto.name())
                .description(coachDto.description())
                .imgUrl(coachDto.imgUrl()).build());
    }

    @CacheEvict(value = "static", key = "'coachSlider'")
    @Transactional(timeout = 7)
    @Override
    public void updateCoach(CoachDataDto coachDto, Long coachID) {

        Optional<Coach> optionalCoach = coachRepo.findById(coachID);
        if (optionalCoach.isEmpty()) {
            log.debug("Coach is not exist when updating");
            throw new IllegalArgumentException("Coach is not exist when updating");
        }

        Coach coach = optionalCoach.get();
        coach.setName(coachDto.name());
        coach.setDescription(coachDto.description());
        coach.setImgUrl(coachDto.imgUrl());
        coach.setUpdatedAt(LocalDateTime.now());
    }

    @CacheEvict(value = "static", key = "'coachSlider'")
    @Transactional(timeout = 7)
    @Override
    public void deleteCoach(Long coachID) {

        Optional<Coach> optionalCoach = coachRepo.findById(coachID);
        if (optionalCoach.isEmpty()) {
            log.debug("Coach is not exist when deleting");
            throw new IllegalArgumentException("Coach is not exist when deleting");
        }

        Coach coach = optionalCoach.get();
        coach.setDeletedAt(LocalDateTime.now());
    }
}
