package main.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import main.dto.AddProfileDto;
import main.dto.ApiResponse;
import main.dto.ProfileDto;
import main.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final ProfileService profileService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addProfile(
            @Valid @RequestBody AddProfileDto addProfileDto) {

        try {
            profileService.addProfile(addProfileDto);
            return ResponseEntity.ok().body(new ApiResponse<>(
                    true,
                    "Profile create successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse<>(
                    false,
                    "Create Profile filed" + e,
                    null
            ));
        }
    }

    @GetMapping("/get")
    public ResponseEntity<ProfileDto> getUserProfile(@RequestHeader("X-User-ID") long userID) {
        ProfileDto profile = profileService.getUserProfile(userID);
        if (profile == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(profile);
        }
    }
}
