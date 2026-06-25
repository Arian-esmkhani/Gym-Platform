package main.Controller;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import main.dto.ApiResponse;
import main.dto.CoachDataDto;
import main.dto.CoachDto;
import main.dto.UserCoachDto;
import main.service.CoachService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/coach")
@RequiredArgsConstructor
public class CoachController {
    private final CoachService coachService;

    @GetMapping("/slider")
    public List<CoachDto> getCoaches() {
        return coachService.getCoaches();
    }

    @GetMapping("/data/{id}")
    public ResponseEntity<CoachDataDto> getCoachData(@PathVariable long id) {

        if (id<1 || 20<id) {
            log.warn("Invalid id: {}", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }

        CoachDataDto data = coachService.getCoachData(id);
        if (data == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(data);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserCoachDto> getUserCoach(
            @RequestHeader("X-User-ID") long userID) {

        UserCoachDto coach = coachService.getUserCoach(userID);
        if (coach == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(coach);
        }
    }

    @PostMapping("/add/user/{coachID}")
    public ResponseEntity<ApiResponse<Void>> addUserCoach(
            @RequestHeader("X-User-ID") long userID,
            @PathVariable long coachID) {

        if (coachID<1 || 20<coachID) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }

        try {
            coachService.addUserCoach(userID, coachID);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Coach add successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(
                    false,
                    "Adding filed with error:" + e,
                    null
            ));
        }
    }
}
