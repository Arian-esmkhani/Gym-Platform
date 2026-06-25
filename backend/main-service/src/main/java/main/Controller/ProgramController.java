package main.Controller;

import jakarta.persistence.NoResultException;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.dto.ProgramResponse;
import main.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/program")
@RequiredArgsConstructor
public class ProgramController {
    private final ProgramService programService;

    @GetMapping("/get")
    public ResponseEntity<ProgramResponse> getProgramData(
            @RequestParam(defaultValue = "1") @Min(1) @Max(7) Integer day,
            @RequestHeader("X-User-ID") long userId) {

        try {
            ProgramResponse program = programService.getProgramData(userId, day);
            if (program == null) {
                return ResponseEntity.noContent().build();
            } else {
                return  ResponseEntity.ok().body(program);
            }
        } catch (NoResultException e) {
            return ResponseEntity.noContent().build();
        }
    }
}
