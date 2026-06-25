import { ApiResponse } from "../types/api";
import { AuthRequest, AuthResponse, SaveUserDto } from "../types/auch";

export const authService = {

    async login(authRequest: AuthRequest) {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(authRequest),
    });
    if (!response.ok) throw new Error('Failed to login');
    return response.json() as Promise<AuthResponse>;
    },

    async register(authRequest: SaveUserDto) {
    const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(authRequest),
    });
    if (!response.ok) throw new Error('Failed to register');
    return response.json() as Promise<ApiResponse<void>>;
    },
}