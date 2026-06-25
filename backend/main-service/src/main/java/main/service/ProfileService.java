package main.service;

import main.dto.AddProfileDto;
import main.dto.ProfileDto;


public interface ProfileService {
    void addProfile(AddProfileDto addProfileDto);
    //For profile section in front
    ProfileDto getUserProfile(long userID);
}
