package coach.controller;

import coach.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/add")
    public ResponseEntity<Void> addNote(@RequestParam String note) {
        try {
            profileService.addNote(note);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get")
    public ResponseEntity<String> coachNote(@RequestParam long userID) {
        String data = profileService.coachNote(userID);
        if (data == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(data);
        }
    }
}
