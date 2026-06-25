import { useCallback, useState } from "react";
import { coachService } from "../service/coach-service";
import { useRouter } from "next/navigation";

export const useCoach = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleAuthError = useCallback(() => {
        router.push('http://localhost:3000/page/login');
        return null;
    }, [router]);

    const getCoaches = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await coachService.getCoaches();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const findCoachById = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await coachService.findCoachById(id);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getUserCoach = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await coachService.getUserCoach();
            return result;
        } catch (err) {
            if (err instanceof Error && err.message === 'UNAUTHORIZED') {
                return handleAuthError();
            }
            if (err instanceof Error && err.message === 'NO CONTENT') {
                setError(err.message);
            }
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, [handleAuthError]);

    const addUserCoach = useCallback(async (coachID: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await coachService.addUserCoach(coachID);
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
        getCoaches,
        getUserCoach,
        addUserCoach,
        findCoachById
    };
}