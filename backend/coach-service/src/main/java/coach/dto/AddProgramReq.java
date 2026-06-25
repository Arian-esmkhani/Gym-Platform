package coach.dto;

import java.util.List;

public record AddProgramReq(
        int day,
        String title,
        String note,
        long userId,
        List<Long> exerciseID
) {}
