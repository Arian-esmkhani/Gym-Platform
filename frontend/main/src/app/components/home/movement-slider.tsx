'use client'

import { useExercise } from "@/app/hooks/use-exercise";
import { ExerciseDto } from "@/app/types/exercise-type";
import { InfiniteSlider } from "@/app/ui/carousel";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function MovmentSlider() {
  const router = useRouter();
  const [arm, setArm] = useState<ExerciseDto[]>([]);
  const [leg, setLeg] = useState<ExerciseDto[]>([]);
  const [chest, setChest] = useState<ExerciseDto[]>([]);
  const { armSlider, chestSlider, legSlider} = useExercise();    

  useEffect(() => {
          const fetchArm = async () => {
              const data = await armSlider();
              if (data && data.length > 0) {
                  setArm(data);
              }
          };
              
          fetchArm();
  }, [armSlider]);

  useEffect(() => {
          const fetchLeg = async () => {
              const data = await legSlider();
              if (data && data.length > 0) {
                  setLeg(data);
              }
          };
              
          fetchLeg();
  }, [legSlider]);


  useEffect(() => {
          const fetchChest = async () => {
              const data = await chestSlider();
              if (data && data.length > 0) {
                  setChest(data);
              }
          };
              
          fetchChest();
  }, [chestSlider]);

  const armItems = useMemo(() => {
          return arm.map((item) => ({
              imgSrc: item.imgUrl,
              imgAlt: item.name,
              title: item.name,
              description: item.muscle,
              variant: "outlined" as const,
              tone: "secondary" as const,
              size: "md" as const,
              onClick: () => router.push(`/components/${item.id.toString()}/exercise`),
              armData: arm,
          }));
  }, [arm, router]);

  const legItems = useMemo(() => {
          return leg.map((item) => ({
              imgSrc: item.imgUrl,
              imgAlt: item.name,
              title: item.name,
              description: item.muscle,
              variant: "outlined" as const,
              tone: "secondary" as const,
              size: "md" as const,
              onClick: () => router.push(`/components/${item.id.toString()}/exercise`),
              legData: leg,
          }));
  }, [leg, router]);

  const chestItems = useMemo(() => {
          return chest.map((item) => ({
              imgSrc: item.imgUrl,
              imgAlt: item.name,
              title: item.name,
              description: item.muscle,
              variant: "outlined" as const,
              tone: "secondary" as const,
              size: "md" as const,
              onClick: () => router.push(`/components/${item.id.toString()}/exercise`),
              chestData: chest,
          }));
  }, [chest, router]);
  
  return (
    <section className="py-12 bg-linear-to-b from-gray-900 to-black">
      
      <div className="text-center mb-14 px-4">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-linear-to-r from-transparent to-amber-500/50"></div>
          <span className="text-amber-400 text-sm font-medium tracking-wider">COMPREHENSIVE SUPPORT</span>
          <div className="w-8 h-px bg-linear-to-l from-transparent to-amber-500/50"></div>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          From <span className="text-white font-medium">tailored applications</span> to 
          <span className="text-white font-medium"> expert-led video tutorials</span>—
          your dedicated fitness ally in every workout.
        </p>
      </div>
      
      <div className="space-y-20 px-4">
        
        <div className="group">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-900/30 to-amber-700/20 
                            flex items-center justify-center border border-amber-500/20">
                <span className="text-amber-400 text-lg">💪</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">CHEST EXERCISES</h3>
                <p className="text-sm text-gray-400 mt-1">Build powerful upper body strength</p>
              </div>
            </div>
            <span className="text-amber-400 text-sm font-medium cursor-pointer 
                           hover:text-amber-300 transition-colors flex items-center gap-2" 
                           onClick={() => router.push(`/components/${'chest'}/movments`)}>
              Explore all
              <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-linear-to-r from-gray-800/40 to-transparent p-1">
            <InfiniteSlider items={chestItems} />
          </div>
        </div>
        
        <div className="group">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-900/30 to-blue-700/20 
                            flex items-center justify-center border border-blue-500/20">
                <span className="text-blue-400 text-lg">💪</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">ARMS EXERCISES</h3>
                <p className="text-sm text-gray-400 mt-1">Sculpt defined arms and forearms</p>
              </div>
            </div>
            <span className="text-blue-400 text-sm font-medium cursor-pointer 
                           hover:text-blue-300 transition-colors flex items-center gap-2"
                           onClick={() => router.push(`/components/${'arms'}/movments`)}>
              Explore all
              <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-linear-to-r from-gray-800/40 to-transparent p-1">
            <InfiniteSlider items={armItems} />
          </div>
        </div>
        
        <div className="group">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-900/30 to-green-700/20 
                            flex items-center justify-center border border-green-500/20">
                <span className="text-green-400 text-lg">🦵</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">LEGS EXERCISES</h3>
                <p className="text-sm text-gray-400 mt-1">Develop strong foundation and stability</p>
              </div>
            </div>
            <span className="text-green-400 text-sm font-medium cursor-pointer 
                           hover:text-green-300 transition-colors flex items-center gap-2"
                           onClick={() => router.push(`/components/${'legs'}/movments`)}>
              Explore all
              <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-linear-to-r from-gray-800/40 to-transparent p-1">
            <InfiniteSlider items={legItems} />
          </div>
        </div>
        
      </div>
    </section>
  );
}