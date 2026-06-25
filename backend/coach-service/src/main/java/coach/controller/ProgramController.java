package coach.controller;

import coach.dto.UserDataResponse;
import coach.dto.UserProgramDto;
import coach.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/program")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @GetMapping("/not")
    public ResponseEntity<UserDataResponse> findHaveNotProgramUsers(
            @RequestParam(defaultValue = "0") Integer page) {

        UserDataResponse dataResponse = programService.findHaveNotProgramUsers(
                page);
        if (dataResponse == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(dataResponse);
        }
    }

    @GetMapping("/not/search")
    public ResponseEntity<UserDataResponse> searchHaveNotProgramUsers(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam String name) {

        UserDataResponse dataResponse = programService.searchHaveNotProgramUsers(
                page, name);
        if (dataResponse == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(dataResponse);
        }
    }

    @GetMapping("/have")
    public ResponseEntity<UserDataResponse> findHaveProgramUsers(
            @RequestParam(defaultValue = "0") Integer page) {

        UserDataResponse dataResponse = programService.findHaveProgramUsers(page);
        if (dataResponse == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(dataResponse);
        }
    }

    @GetMapping("/have/search")
    public ResponseEntity<UserDataResponse> searchHaveProgramUsers(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam String name) {

        UserDataResponse dataResponse = programService.searchHaveProgramUsers(
                page, name);
        if (dataResponse == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(dataResponse);
        }
    }

    @GetMapping("/days-data")
    public ResponseEntity<List<UserProgramDto>> userDaysData(
            @RequestParam long userID) {

        List<UserProgramDto> userProgram= programService.userDaysData(userID);
        if (userProgram == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(userProgram);
        }
    }
}
