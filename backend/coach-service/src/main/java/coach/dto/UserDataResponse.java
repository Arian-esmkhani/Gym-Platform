package coach.dto;

import java.util.List;

public record UserDataResponse(
   List<UserData> userData,
   boolean hasNext
) {}
