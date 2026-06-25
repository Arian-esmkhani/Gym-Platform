package main.service;

import lombok.RequiredArgsConstructor;
import main.dto.ProgramResponse;
import main.helper.PageInfo;
import main.repository.ProgramRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService{

    private final ProgramRepo programRepo;
    private final PageInfo pageInfo;
    private static final int SIZE = 1;

    @Override
    @Transactional(readOnly = true, timeout = 7)
    public ProgramResponse getProgramData(long userID, Integer day) {
        boolean hasNext = pageInfo.hasNext(programRepo.countProgram(userID),
        day, SIZE);

        return new ProgramResponse(programRepo.getProgramData(userID, day), hasNext);
    }
}
