'use client'

import { useEffect, useMemo, useState } from "react";
import { AboutHead } from "../../components/about/about-head";
import { GymPyc } from "../../components/gym-pyc";
import { InfiniteSlider } from "../../ui/carousel";
import { CoachDto } from "@/app/types/coach-type";
import { useCoach } from "@/app/hooks/use-coach";
import { useRouter } from "next/navigation";

export default function AboutPage() {
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
        <div>
            <AboutHead/>
            <GymPyc/>
            <div className="mt-16 px-4">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-10 bg-linear-to-r from-transparent to-amber-500/50"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                    Our <span className="text-amber-400">Elite Coaching Team</span>
                    </h3>
                    <div className="h-px w-10 bg-linear-to-l from-transparent to-amber-500/50"></div>
                </div>
                
                <div className="mb-10 relative">
                    <div className="absolute -inset-1 bg-linear-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-xl blur-sm"></div>
                    <div className="relative bg-linear-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-2">
                    <InfiniteSlider items={coachItems} />
                    </div>
                </div>
                
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="text-white font-medium">NASM/ACE certified specialists</span> with advanced training in 
                    <span className="text-amber-300"> functional movement patterns</span>, 
                    <span className="text-amber-300"> Olympic weightlifting techniques</span>, and 
                    <span className="text-amber-300"> sports injury rehabilitation</span>. 
                    Each coach integrates evidence-based methodologies with personalized motivation to 
                    optimize performance, accelerate progress, and ensure long-term athletic development.
                    </p>
                </div>
            </div>
        </div>
    )
}