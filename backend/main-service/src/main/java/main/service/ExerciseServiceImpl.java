package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.ExerciseDataDto;
import main.dto.ExerciseDto;
import main.dto.ExerciseResponse;
import main.helper.PageInfo;
import main.repository.ExerciseRepo;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService{

    private final ExerciseRepo exerciseRepo;
    private final PageInfo pageInfo;

    private static final int PAGE_SIZE = 12;

    @Transactional(readOnly = true, timeout = 5)
    @Override
    public ExerciseResponse getByMuscleName(String name, Integer page) {
        boolean hasNext = pageInfo.hasNext(countGetByMuscleName(name),
                page, PAGE_SIZE);

        List<ExerciseDto> exercises = exerciseRepo.getByMuscleName(name,
                PAGE_SIZE, page *  PAGE_SIZE);

        return new ExerciseResponse(hasNext, exercises);
    }

    @Transactional(readOnly = true, timeout = 4)
    @Cacheable(value = "static", key = "'countGetByMuscleName'")
    private Long countGetByMuscleName(String name) {
        return exerciseRepo.countGetByMuscleName(name);
    }


    @Override
    public ExerciseDataDto getExercise(long exerciseID) {
        return exerciseRepo.getExercise(exerciseID);
    }

    @Transactional(readOnly = true, timeout = 7)
    @Override
    public ExerciseResponse search(String name, Integer page) {
        boolean hasNext = pageInfo.hasNext(countSearch(name),
                page, PAGE_SIZE);

        List<ExerciseDto> search = exerciseRepo.search(name,
                PAGE_SIZE, page *  PAGE_SIZE);

        return new ExerciseResponse(hasNext, search);
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    public List<String> searchName(String name) {
        return exerciseRepo.searchName(name);
    }

    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'countSearch'")
    private Long countSearch(String name) {
        return exerciseRepo.countSearch(name);
    }

    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'armSlider'")
    @Override
    public List<ExerciseDto> armSlider() {
        return exerciseRepo.armSlider();
    }

    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'legSlider'")
    @Override
    public List<ExerciseDto> legSlider() {
        return exerciseRepo.legSlider();
    }

    @Transactional(readOnly = true, timeout = 3)
    @Cacheable(value = "static", key = "'chestSlider'")
    @Override
    public List<ExerciseDto> chestSlider() {
        return exerciseRepo.chestSlider();
    }
}
