package coach.service;

import coach.model.Profile;
import coach.repo.ProfileRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepo profileRepo;

    @Override
    @Transactional(timeout = 5)
    public void addNote(String note) {
        profileRepo.save(Profile.builder().coachNote(note).build());
    }

    @Override
    @Transactional(readOnly = true, timeout = 3)
    public String coachNote(long userID) {
        return profileRepo.coachNote(userID).orElse(null);
    }
}
