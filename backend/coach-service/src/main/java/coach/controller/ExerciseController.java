package coach.controller;

import coach.dto.AddProgramReq;
import coach.dto.ApiResponse;
import coach.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addProgram(@RequestBody AddProgramReq req) {

         try {
             exerciseService.addProgram(req);
             return ResponseEntity.ok().body(new ApiResponse<>(
                     true,
                     "Add successfully",
                     null
             ));
         } catch (Exception e) {
             return ResponseEntity.internalServerError().body(new ApiResponse<>(
                     false,
                     "Filed" + e,
                     null
             ));
         }
    }

    @PostMapping("/delete")
    public ResponseEntity<ApiResponse<Void>> deleteProgram(@RequestParam long exerciseProgramID) {

        try {
            exerciseService.deleteProgram(exerciseProgramID);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Delete successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse<>(
                    false,
                    "Filed" + e,
                    null
            ));
        }
    }
}
