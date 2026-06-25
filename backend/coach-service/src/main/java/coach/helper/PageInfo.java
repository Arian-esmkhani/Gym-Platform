package coach.helper;

import org.springframework.stereotype.Component;

//For Pagination
@Component
public class PageInfo {
    public boolean hasNext(Long total, Integer page, int pageSize) {
        long totalPages = (total + pageSize -1) / pageSize;
        return page + 1 < totalPages;
    }
}