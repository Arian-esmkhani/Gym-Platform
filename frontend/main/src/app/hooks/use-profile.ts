import { useCallback, useState } from "react";
import { profileService } from "../service/profile_service";
import { AddProfileDto } from "../types/profile";
import { useRouter } from "next/navigation";

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleAuthError = useCallback(() => {
            router.push('http://localhost:3000/page/login');
            return null;
    }, [router]);

    const addProfile = useCallback(async (profile: AddProfileDto) => {
        setLoading(true);
        setError(null);
        try {
            const result = await profileService.addProfile(profile);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await profileService.getProfile();
            return result;
        } catch (err) {
            if (err instanceof Error && err.message === 'UNAUTHORIZED') {
                return handleAuthError();
            }
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, [handleAuthError]);

    const getProgramData = useCallback(async (day: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await profileService.getProgramData(day);
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
        addProfile,
        getProgramData,
        getProfile
    };
}