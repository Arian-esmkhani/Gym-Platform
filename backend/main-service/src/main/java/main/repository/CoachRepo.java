package main.repository;

import main.dto.UserCoachDto;
import org.springframework.data.repository.query.Param;
import main.dto.CoachDataDto;
import main.dto.CoachDto;
import main.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepo extends JpaRepository<Coach, Long> {
    //Getting coaches for coach slider
    @Query ("SELECT NEW main.dto.CoachDto(c.id, c.name, c.imgUrl) " +
            "FROM Coach c WHERE c.deletedAt IS NULL")
    List<CoachDto> getCoaches();

    //Getting user coach data
    @Query ("SELECT NEW main.dto.UserCoachDto(u.username, c.id, c.name, c.imgUrl) " +
            "FROM User u JOIN u.coach c WHERE u.id = :id")
    Optional<UserCoachDto> getUserCoach(@Param("id") long userID);

    //Getting coach data with id
    @Query ("SELECT NEW main.dto.CoachDataDto(c.name, c.description, c.imgUrl, c.ability) " +
            "FROM Coach c WHERE c.id = :coachID")
    CoachDataDto getCoachData(@Param("coachID") long coachID);
}