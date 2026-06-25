import { ApiResponse } from "../type/api-response.type";
import { ExerciseDataDto } from "../type/exercise.type";

export const exerciseService = {
  async saveExercise(exercise: ExerciseDataDto) {
    const response = await fetch(`/api/exercise/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(exercise)
    });
    if (!response.ok) throw new Error('Failed to save exercise');
    return response.json() as Promise<ApiResponse<void>>;
  },
}
