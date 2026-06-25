'use client'

import { useExercise } from "@/app/hooks/use-exercise";
import { ExerciseDto } from "@/app/types/exercise-type";
import { Cart } from "@/app/ui/cart";
import SearchLabel from "@/app/ui/search-lable";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ExercisePage() {
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const { search, loading: hookLoading } = useExercise();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoadingRef = useRef(false);
  const currentSearchRef = useRef<string | null>(null);
  const router = useRouter();

  // تابع fetch با searchQuery
  const fetchExercises = useCallback(async (query: string, pageNum: number) => {
    if (isLoadingRef.current) return null;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    
    try {
      const searchTerm = query.trim() || "";
      const data = await search(searchTerm, pageNum);
      return data;
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [search]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (query !== currentSearchRef.current) {
      currentSearchRef.current = query;
      setExercises([]);
      setPage(0);
      setHasNext(true);
      setInitialLoaded(false);
      
      const loadInitialData = async () => {
        const data = await fetchExercises(query, 0);
        if (data) {
          setExercises(data.exercises);
          setHasNext(data.hasNext);
        }
        setInitialLoaded(true);
      };
      
      loadInitialData();
    }
  }, [fetchExercises]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasNext) return;
    
    const nextPage = page + 1;
    const data = await fetchExercises(searchQuery, nextPage);
    
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
  }, [searchQuery, page, hasNext, exercises, fetchExercises]);

  // Infinite scroll effect
  useEffect(() => {
    if (!hasNext || isLoadingRef.current || !initialLoaded) return;
    
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
  }, [loadMore, hasNext, initialLoaded]);

  useEffect(() => {
    const loadInitial = async () => {
      const data = await fetchExercises("", 0);
      if (data) {
        setExercises(data.exercises);
        setHasNext(data.hasNext);
        setInitialLoaded(true);
      }
    };
    
    if (!initialLoaded) {
      loadInitial();
    }
  }, [fetchExercises, initialLoaded]);

  // Loading states
  const isFirstLoad = !initialLoaded && (isLoading || hookLoading);
  const showNoData = initialLoaded && exercises.length === 0 && !isLoading;
  const showExercises = exercises.length > 0 && initialLoaded;

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-400 
                           bg-clip-text text-transparent">
              Practice Makes Perfect
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            We are with you every step of the way—
          </p>
          <p className="text-3xl font-bold text-amber-500 animate-pulse">
            JUST DO IT.
          </p>
        </div>
        
        <div className="mx-[43.5%] mb-12">
          <SearchLabel
            onSearchClick={() => handleSearch(searchQuery)}
            onEnterPress={() => handleSearch(searchQuery)}
            onChange={(value) => {
              setSearchQuery(value);
            }}
            delay={500}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {isFirstLoad && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              <p className="text-gray-400 mt-4">Loading exercises...</p>
            </div>
          )}

          {showNoData && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">No exercises found</p>
              <p className="text-gray-500 mt-2">Try a different search term</p>
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

              {/* Load more indicator */}
              {hasNext && !isLoading && (
                <div className="text-center mt-12">
                  <p className="text-gray-400">Scroll down to load more</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                  <p className="text-gray-400 mt-2">Loading more...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}