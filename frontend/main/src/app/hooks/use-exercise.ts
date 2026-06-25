import { useCallback, useState } from "react";
import { exerciseService } from "../service/exercise-service";

export const useExercise = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const findExercises = useCallback(async (name: string, page: number = 0) => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.getExercise(name, page);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const search = useCallback(async (name: string, page: number = 0) => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.search(name, page);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const armSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.armSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    
    const chestSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.chestSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);    

    const legSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.legSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);   
    
    const findExercise = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await exerciseService.findExercise(id);
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
        findExercises,
        armSlider,
        chestSlider,
        legSlider,
        search,
        findExercise
    };
}