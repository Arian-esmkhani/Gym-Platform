import { Injectable } from "@angular/core";
import { CoachDataDto } from "../type/coach.tupe";
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { ApiResponse } from "../type/api-response.type";
import { coachService } from "../service/coach.service";

@Injectable({
  providedIn: 'root'
})
export class CoachHooks {
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string | null>(null);

  loading$ = this.loading.asObservable();
  error$ = this.error.asObservable();

  useSaveCoach(): (saveCoachDto: CoachDataDto) => Observable<ApiResponse<void>> {
    return (saveCoachDto: CoachDataDto) => {
      this.loading.next(true);
      this.error.next(null);

      return new Observable<ApiResponse<void>>(observer => {
        coachService.saveCoach(saveCoachDto)
          .then(result => {
            observer.next(result);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      }).pipe(
        catchError(error => {
          const errorMessage = error.message || 'Failed to save coach';
          this.error.next(errorMessage);
          throw error;
        }),
        finalize(() => this.loading.next(false))
      );
    };
  }
}
