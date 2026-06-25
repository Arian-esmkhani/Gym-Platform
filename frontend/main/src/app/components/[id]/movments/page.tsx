'use client'

import { useExercise } from "@/app/hooks/use-exercise";
import { ExerciseDto } from "@/app/types/exercise-type";
import { Cart } from "@/app/ui/cart";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";

export default function Page() {
    const { findExercises, loading: hookLoading } = useExercise();
    const params = useParams<{ id: string }>();
    const muscleName = useMemo(() => params.id as string, [params.id]);
    const [exercises, setExercises] = useState<ExerciseDto[]>([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const isLoadingRef = useRef(false);
    const currentNameRef = useRef<string | null>(null);
    const router = useRouter();

    const fetchExercises = useCallback(async (name: string, pageNum: number) => {
        if (!name || isLoadingRef.current) return null;
        
        isLoadingRef.current = true;
        setIsLoading(true);
        
        try {
            const data = await findExercises(name, pageNum);
            return data;
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [findExercises]);

    useEffect(() => {
        if (!muscleName || muscleName === currentNameRef.current) return;
        
        const loadInitialData = async () => {
            currentNameRef.current = muscleName;
            setExercises([]);
            setPage(0);
            setHasNext(true);
            setInitialLoaded(false);
            
            const data = await fetchExercises(muscleName, 0);
            if (data) {
                setExercises(data.exercises);
                setHasNext(data.hasNext);
            }
            setInitialLoaded(true);
        };
        
        loadInitialData();
    }, [muscleName, fetchExercises]);

    const loadMore = useCallback(async () => {
        if (!muscleName || isLoadingRef.current || !hasNext) return;
        
        const nextPage = page + 1;
        
        const data = await fetchExercises(muscleName, nextPage);
        if (data && data.exercises.length > 0) {
            const newExercises = data.exercises.filter(newEx => 
                !exercises.some(oldEx => oldEx.id === newEx.id)
            );
            
            if (newExercises.length > 0) {
                setExercises(prev => [...prev, ...newExercises]);
                setHasNext(data.hasNext);
                setPage(nextPage);
            }
        }
    }, [muscleName, page, hasNext, exercises, fetchExercises]);

    // Infinite scroll با debounce
    useEffect(() => {
        if (!hasNext || isLoadingRef.current) return;
        
        let timeoutId: NodeJS.Timeout;
        let isHandling = false;
        
        const handleScroll = () => {
            if (isHandling) return;
            
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                isHandling = true;
                
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                const scrollBottom = scrollTop + clientHeight;
                const isNearBottom = scrollBottom >= scrollHeight - 300;
                
                if (isNearBottom) {
                    loadMore();
                }
                
                isHandling = false;
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [loadMore, hasNext]);

    // Loading states
    const isFirstLoad = !initialLoaded && (isLoading || hookLoading);
    const showNoData = initialLoaded && exercises.length === 0 && !isLoading;
    const showExercises = exercises.length > 0 && initialLoaded;

    if (!muscleName && !initialLoaded) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                        {muscleName?.replace(/-/g, ' ') || 'Exercises'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isLoading ? 'Loading...' : `${exercises.length} exercises found`}
                    </p>
                </div>

                {isFirstLoad && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                )}

                {showNoData && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No exercises found for {muscleName}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                            Try a different muscle group
                        </p>
                    </div>
                )}

                {showExercises && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {exercises.map((exercise, index) => (
                                <Cart
                                    key={`${exercise.id}-${index}-${page}`}
                                    imgSrc={exercise.imgUrl || "/leonkennedy.jpg"}
                                    imgAlt={exercise.name}
                                    imgHeight={200}
                                    imgWidth={300}
                                    size="md"
                                    variant="outlined"
                                    tone="secondary"
                                    title={exercise.name}
                                    description={exercise.muscle}
                                    onClick= {() => router.push(`/components/${exercise.id.toString()}/exercise`)}
                                />
                            ))}
                        </div>

                        {isLoading && hasNext && (
                            <div className="flex justify-center mt-8 py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                            </div>
                        )}

                        {!hasNext && exercises.length > 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-8 py-4">
                                All {exercises.length} exercises loaded
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}