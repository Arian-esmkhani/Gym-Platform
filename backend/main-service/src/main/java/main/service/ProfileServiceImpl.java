package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.AddProfileDto;
import main.dto.ProfileDto;
import main.model.Profile;
import main.repository.ProfileRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepo profileRepo;

    @Override
    @Transactional(timeout = 5)
    public void addProfile(AddProfileDto addProfileDto) {
        profileRepo.save(Profile.builder()
                .phoneNumber(addProfileDto.phoneNumber())
                .age(addProfileDto.age())
                .height(addProfileDto.height())
                .weight(addProfileDto.weight())
                .size(addProfileDto.size())
                .userNote(addProfileDto.userNote()).build());
    }

    @Override
    public ProfileDto getUserProfile(long userID) {
        return profileRepo.getUserProfile(userID).orElse(null);
    }
}
