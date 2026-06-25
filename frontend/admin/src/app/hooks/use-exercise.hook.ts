import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { ApiResponse } from "../type/api-response.type";
import { ExerciseDataDto } from "../type/exercise.type";
import { exerciseService } from "../service/exercise.service";

@Injectable({
  providedIn: 'root'
})
export class ExerciseHooks {
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string | null>(null);

  loading$ = this.loading.asObservable();
  error$ = this.error.asObservable();

  useSaveExercise(): (saveDto: ExerciseDataDto) => Observable<ApiResponse<void>> {
    return (saveDto: ExerciseDataDto) => {
      this.loading.next(true);
      this.error.next(null);

      return new Observable<ApiResponse<void>>(observer => {
        exerciseService.saveExercise(saveDto)
          .then(result => {
            observer.next(result);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      }).pipe(
        catchError(error => {
          const errorMessage = error.message || 'Failed to save exercise';
          this.error.next(errorMessage);
          throw error;
        }),
        finalize(() => this.loading.next(false))
      );
    };
  }
}
