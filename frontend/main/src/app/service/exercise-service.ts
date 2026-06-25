import { ExerciseDataDto, ExerciseDto, ExerciseResponse } from "../types/exercise-type";

export const exerciseService = {
  async getExercise(name: string, page: number = 0) {
    const response = await fetch(`/api/exercise/by-muscle/${name}?page=${page}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseResponse>;
  },

  async search(name: string, page: number = 0) {
    const response = await fetch(`/api/exercise/search/${name}?page=${page}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseResponse>;
  },

  async armSlider() {
    const response = await fetch(`/api/exercise/arm-slider`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseDto[]>;
  },

  async legSlider() {
    const response = await fetch(`/api/exercise/leg-slider`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseDto[]>;
  },

  async chestSlider() {
    const response = await fetch(`/api/exercise/chest-slider`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseDto[]>;
  },

  async findExercise(id: number) {
    const response = await fetch(`/api/exercise/get/${id}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ExerciseDataDto>;
  },
}