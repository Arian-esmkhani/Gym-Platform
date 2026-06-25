import { ApiResponse } from "../types/api";
import { CoachDataDto, CoachDto, UserCoachDto } from "../types/coach-type";

export const coachService = {
  async getCoaches() {
    const response = await fetch(`/api/coach/slider`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return response.json() as Promise<CoachDto[]>;
  },

  async findCoachById(id: number) {
    const response = await fetch(`/api/coach/data/${id}`, {
      method: 'GET'
    })
    if (!response.ok) throw new Error('Failed to fetch coach');
    return response.json() as Promise<CoachDataDto>;
  },

  async getUserCoach() {
    const response = await fetch(`/api/coach/user`, {
      method: 'GET'
    })
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (response.status === 204) {
      throw new Error('NO CONTENT');
    }
    if (!response.ok) throw new Error('Failed to fetch coach');    
    return response.json() as Promise<UserCoachDto>;
  },

  async addUserCoach(coachID: number) {
    const response = await fetch(`/api/coach/add/user/${coachID}`, {
      method: 'POST'
    })
    if (!response.ok) throw new Error('Failed to add coach');
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    return response.json() as Promise<ApiResponse<void>>;
  },
}