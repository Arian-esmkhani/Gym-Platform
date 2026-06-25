import { ApiResponse } from "../type/api-response.type";
import { CoachDataDto } from "../type/coach.tupe";

export const coachService = {
  async saveCoach(coach: CoachDataDto) {
    const response = await fetch(`/api/coatch/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(coach)
    });
    if (!response.ok) throw new Error('Failed to save coach');
    return response.json() as Promise<ApiResponse<void>>;
  },
}
