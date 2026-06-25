package coach.repo;


import coach.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepo extends MongoRepository<Profile, String> {

    @Query(value = "{ 'userId': ?0 }",
            fields = "{ 'coachNote': 1 }")
    Optional<String> coachNote(long userID);
}
