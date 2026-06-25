package main.Controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import main.dto.ExerciseDataDto;
import main.dto.ExerciseDto;
import main.dto.ExerciseResponse;
import main.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    private static final String SAFE_STRING_PATTERN = "^[a-zA-Z0-9\\s\\-_.]*$|^$";
    private static final int MAX_PAGE_NUMBER = 1000;
    private static final long MAX_ID = 1000000;

    @GetMapping("/by-muscle/{name}")
    public ResponseEntity<ExerciseResponse> getByMuscleName(
            @RequestParam(defaultValue = "0") @Min(0) @Max(MAX_PAGE_NUMBER) Integer page,
            @PathVariable @Pattern(regexp = SAFE_STRING_PATTERN) String name) {

        ExerciseResponse data = exerciseService.getByMuscleName(name, page);
        if (data == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(data);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ExerciseDataDto> getExercise(
            @PathVariable @Positive @Max(MAX_ID) long id) {

        ExerciseDataDto data = exerciseService.getExercise(id);
        if (data == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(data);
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<ExerciseResponse> search(
            @RequestParam(defaultValue = "0") @Min(0) @Max(MAX_PAGE_NUMBER) Integer page,
            @PathVariable @Pattern(regexp = SAFE_STRING_PATTERN) String name) {

        ExerciseResponse data = exerciseService.search(name, page);
        if (data == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(data);
        }
    }

    @GetMapping("/search/name")
    public List<String> searchName(
            @RequestParam @Pattern(regexp = SAFE_STRING_PATTERN) String name) {

        return exerciseService.searchName(name);
    }

    @GetMapping("/arm-slider")
    public List<ExerciseDto> armSlider() {
        return exerciseService.armSlider();
    }

    @GetMapping("/leg-slider")
    public List<ExerciseDto> legSlider() {
        return exerciseService.legSlider();
    }

    @GetMapping("/chest-slider")
    public List<ExerciseDto> chestSlider() {
        return exerciseService.chestSlider();
    }
}
