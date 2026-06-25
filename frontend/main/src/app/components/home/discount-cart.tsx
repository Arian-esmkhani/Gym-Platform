'use client'

import { useCoach } from '@/app/hooks/use-coach';
import { CoachDto } from '@/app/types/coach-type';
import { InfiniteSlider } from '@/app/ui/carousel'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/navigation";

export function DiscountCart() {
    const router = useRouter();
    const [coaches, setCoach] = useState<CoachDto[]>([]);
    const { getCoaches} = useCoach();    
    const [hasData, setHasData] = useState(false);   

    useEffect(() => {
        const fetchCoach = async () => {
            const data = await getCoaches();
            if (data && data.length > 0) {
                setCoach(data);
                setHasData(true);
            } else {
                setHasData(false);
            }
        };
            
        fetchCoach();
    }, [getCoaches]);

    const coachItems = useMemo(() => {
        return coaches.map((coach) => ({
            imgSrc: coach.imgUrl,
            imgAlt: coach.name,
            title: coach.name,
            variant: "neutral" as const,
            tone: "secondary" as const,
            size: "sm" as const,
            className: "rounded-4xl",
            onClick: () => router.push(`/components/${coach.id.toString()}/coach-information`),
            coachData: coach,
        }));
    }, [coaches, router]);

    return(
        <div className='bg-gray-600/50'>
            <div>
                <span>
                    <Image
                        src={"/Survival.jpg"} 
                        alt={'img'}
                        height={500}
                        width={1000}
                        className='rounded-lg overflow-hidden h-[12.8vw] w-full mx-auto'/>
                </span>
                <div className="w-[90%] mx-auto mt-4">
                    <InfiniteSlider 
                        items={coachItems} 
                        className="w-full text-black "
                    />
                </div>
            </div>
            <div className='mt-14 p-7 bg-gray-600/80'>
                <p className="w-[80%] mx-auto text-center font-bold text-3xl text-gray-900">
                We are <span className="text-amber-700">BATIS</span>.
                <span className="block mt-2 text-xl text-gray-700">Building strength, transforming lives.</span>
                <span className="block mt-4 text-4xl font-black text-black">JUST DO IT.</span>
                </p>
            </div>
        </div>
    )
}