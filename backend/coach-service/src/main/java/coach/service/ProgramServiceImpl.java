package coach.service;

import coach.dto.AddProgramReq;
import coach.dto.UserData;
import coach.dto.UserDataResponse;
import coach.dto.UserProgramDto;
import coach.helper.PageInfo;
import coach.repo.ProgramRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService{

    private final ProgramRepo programRepo;
    private final PageInfo pageInfo;

    private static final int PAGE_SIZE = 12;

    @Override
    @Transactional(readOnly = true, timeout = 5)
    public UserDataResponse findHaveNotProgramUsers(Integer page) {
        boolean hasNext = pageInfo.hasNext(countHaveNot(), page, PAGE_SIZE);

        List<UserData> userData = programRepo.findHaveNotProgramUsers(PAGE_SIZE,
                page *  PAGE_SIZE);

        return new UserDataResponse(userData, hasNext);
    }

    @Transactional(readOnly = true, timeout = 4)
    @Cacheable(value = "program", key = "'countHaveNot'")
    private Long countHaveNot() {
        return programRepo.countHaveNot();
    }

    @Override
    @Transactional(readOnly = true, timeout = 6)
    public UserDataResponse searchHaveNotProgramUsers(Integer page, String name) {
        boolean hasNext = pageInfo.hasNext(countHaveNotSearch(name), page, PAGE_SIZE);

        List<UserData> userData = programRepo.searchHaveNotProgramUsers(name, PAGE_SIZE,
                page *  PAGE_SIZE);

        return new UserDataResponse(userData, hasNext);
    }

    @Transactional(readOnly = true, timeout = 4)
    private Long countHaveNotSearch(String name) {
        return programRepo.countHaveNotSearch(name);
    }

    @Override
    @Transactional(readOnly = true, timeout = 6)
    public UserDataResponse findHaveProgramUsers(Integer page) {
        boolean hasNext = pageInfo.hasNext(countHave(), page, PAGE_SIZE);

        List<UserData> userData = programRepo.findHaveProgramUsers(PAGE_SIZE,
                page *  PAGE_SIZE);

        return new UserDataResponse(userData, hasNext);
    }

    @Transactional(readOnly = true, timeout = 4)
    @Cacheable(value = "program", key = "'countHave'")
    private Long countHave() {
        return programRepo.countHave();
    }

    @Override
    @Transactional(readOnly = true, timeout = 7)
    public UserDataResponse searchHaveProgramUsers(Integer page, String name) {
        boolean hasNext = pageInfo.hasNext(countHaveSearch(name), page, PAGE_SIZE);

        List<UserData> userData = programRepo.searchHaveProgramUsers(name, PAGE_SIZE,
                page *  PAGE_SIZE);

        return new UserDataResponse(userData, hasNext);
    }

    @Transactional(readOnly = true, timeout = 4)
    private Long countHaveSearch(String name) {
        return programRepo.countHaveSearch(name);
    }

    @Override
    @Transactional(readOnly = true, timeout = 5)
    public List<UserProgramDto> userDaysData(long userID) {
        return programRepo.userDaysData(userID);
    }
}
