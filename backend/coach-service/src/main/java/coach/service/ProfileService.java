package coach.service;

//Is for adding and getting coach note
public interface ProfileService {
    void addNote(String note);
    String coachNote(long userID);
}
