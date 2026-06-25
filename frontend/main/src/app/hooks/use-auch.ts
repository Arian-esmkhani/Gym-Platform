import { useCallback, useState } from "react";
import { authService } from "../service/auth-service";
import { AuthRequest, SaveUserDto } from "../types/auch";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const login = useCallback(async (authRequest: AuthRequest) => {
        setLoading(true);
        setError(null);
        try {
            const result = await authService.login(authRequest)
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (authRequest: SaveUserDto) => {
        setLoading(true);
        setError(null);
        try {
            const result = await authService.register(authRequest);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        login,
        register,
    };
}