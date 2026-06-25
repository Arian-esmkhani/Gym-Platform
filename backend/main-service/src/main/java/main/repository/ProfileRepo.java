package main.repository;

import main.dto.ProfileDto;
import main.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepo extends MongoRepository<Profile, String> {

    @Query(value = "{ 'userId': ?0, 'deletedAt': null }",
            fields = "{ '_id': 0, 'phoneNumber': 1, 'age': 1, 'weight': 1, }" +
                    "{ 'height': 1, 'size': 1, 'userNote': 1, 'coachNote': 1, 'createdAt': 1 }")
    Optional<ProfileDto> getUserProfile(long userID);
}
