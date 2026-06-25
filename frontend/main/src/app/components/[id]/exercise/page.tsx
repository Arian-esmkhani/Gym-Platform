'use client'

import { useExercise } from '@/app/hooks/use-exercise';
import { ExerciseDataDto } from '@/app/types/exercise-type';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Page() {
    const { findExercise } = useExercise();
    const params = useParams<{ id: string }>()
    const [exercise, setExercise] = useState<ExerciseDataDto | null>(null)
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        const fetchGame = async () => {
            if (!params?.id) return
            
            try {
                const ExerciseId = Number(params.id)
                const exerciseData = await findExercise(ExerciseId)
                setExercise(exerciseData)
            } catch (error) {
                console.error("Error fetching coach:", error)
            } finally {
                setHasData(true)
            }
        }

        fetchGame()
    }, [params?.id, findExercise])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 rounded-lg overflow-hidden shadow-xl border border-gray-700">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* Aspect Ratio 16:9 */}
                <Image
                src= {exercise?.gifUrl || "/bas.gif"} 
                alt= {exercise?.name || 'gif'}
                fill
                unoptimized={true}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
                />
            </div>
            </div>

            <div className="mb-6 space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white ">{exercise?.name}</h1>
            <h5 className="text-base md:text-lg text-gray-400 ">{exercise?.muscle}</h5>
            </div>

            <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 overflow-x-auto text-sm whitespace-pre-wrap wrap-break-word">
            {exercise?.description}
            </pre>
        </div>
        </div>
    );
}