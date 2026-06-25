package admin.controller;

import admin.dto.ApiResponse;
import admin.dto.ExerciseDataDto;
import admin.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;


    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addCoach(
            @RequestBody ExerciseDataDto exerciseDto) {
        try {
            exerciseService.addExercise(exerciseDto);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                        false,
                        "Not successfully" + e,
                        null
            ));
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Void>> updateCoach(
            @RequestBody ExerciseDataDto exerciseDto,
            @PathVariable Long id) {
        try {
            exerciseService.updateExercise(exerciseDto, id);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
                    false,
                    "Not successfully" + e,
                    null
            ));
        }
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCoach(
            @PathVariable Long id) {
        try {
            exerciseService.deleteExercise(id);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
                    false,
                    "Not successfully" + e,
                    null
            ));
        }
    }
}
