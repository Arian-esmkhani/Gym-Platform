'use client'

import { useCoach } from '@/app/hooks/use-coach';
import { CoachDataDto } from '@/app/types/coach-type';
import { AppButton } from '@/app/ui/button'
import Image from 'next/image'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { findCoachById, addUserCoach } = useCoach();
    const [hasData, setHasData] = useState(false);
    const params = useParams<{ id: string }>()
    const [coach, setCoach] = useState<CoachDataDto | null>(null)

    useEffect(() => {
        const fetchCoach = async () => {
            if (!params?.id) return
            
            try {
                const coachId = Number(params.id)
                const coachData = await findCoachById(coachId)
                setCoach(coachData)
            } catch (error) {
                console.error("Error fetching coach:", error)
            } finally {
                setHasData(true)
            }
        }

        fetchCoach()
    }, [params?.id, findCoachById])

    const handleSubmit = async (): Promise<void> => {
            await addUserCoach(Number(params.id));
    };

    return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-6">
        <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            He can help you to be perfect!
            </span>
        </h1>
        
        <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="w-40 h-40 md:w-48 md:h-48 shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500/30">
                <Image
                    src= {coach?.imgUrl ?? ""}
                    alt= {coach?.name ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 256px"
                />
                </div>
            </div>
            
            <div className="flex-1">
                <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                    Coach <span className="text-amber-400">{coach?.name}</span>
                </h2>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span>🏋️ {coach?.ability}</span>
                </div>
                </div>
                

                <p className="text-gray-300 leading-relaxed">
                    {coach?.description}
                </p>
            </div>
            
            </div>
        </div>
        
        <div className="text-center">
            <AppButton size="lg" className="mx-auto" onClick={handleSubmit}>
            Start Training with {coach?.name}
            </AppButton>
        </div>
        
        </div>
    </div>
    );
}