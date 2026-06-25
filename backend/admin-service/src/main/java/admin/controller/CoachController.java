package admin.controller;

import admin.dto.ApiResponse;
import admin.dto.CoachDataDto;
import admin.service.CoachService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coatch")
@RequiredArgsConstructor
public class CoachController {
    private final CoachService coachService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addCoach(
            @RequestBody CoachDataDto coachDto) {
        try {
            coachService.addCoach(coachDto);
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

    @PostMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Void>> updateCoach(
            @RequestBody CoachDataDto coachDto,
            @PathVariable Long id) {
        try {
            coachService.updateCoach(coachDto, id);
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
            coachService.deleteCoach(id);
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
