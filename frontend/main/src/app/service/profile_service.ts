import { ApiResponse } from "../types/api";
import { AddProfileDto, ProfileDto } from "../types/profile";

export const profileService = {

    async addProfile(profile: AddProfileDto) {
        const response = await fetch(`/api/profile/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(profile),
        });
        if (!response.ok) throw new Error('Failed to register');
        if (response.status === 401) return('UNAUTHORIZED')
        return response.json() as Promise<ApiResponse<void>>;
    },

    async getProfile() {
        const response = await fetch(`/api/profile/get`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        if (response.status === 401) throw new Error('UNAUTHORIZED')
        return response.json() as Promise<ProfileDto>;
    },

    async getProgramData(day: number) {
        const response = await fetch(`/api/program/get?day=${day}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        if (response.status === 401) throw new Error('UNAUTHORIZED')
        return response.json() as Promise<ProfileDto>;
    }    
}