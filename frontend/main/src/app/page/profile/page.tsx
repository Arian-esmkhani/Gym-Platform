'use client'

import { useCoach } from "@/app/hooks/use-coach";
import { useProfile } from "@/app/hooks/use-profile";
import { UserCoachDto } from "@/app/types/coach-type";
import { ProfileDto } from "@/app/types/profile";
import { AppButton } from "@/app/ui/button";
import { Cart } from "@/app/ui/cart";
import { NavButton } from "@/app/ui/nav-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type WorkoutDay = 1 | 2 | 3 | 4 | 5;

interface Exercise {
  id: number;
  order: number;
  movement: string;
  reps: string;
  sets: string;
}

type WorkoutData = Record<WorkoutDay, Exercise[]>;

export default function ExercisePage() {
  const { getUserCoach, error } = useCoach();
  const { getProfile } = useProfile();  
  const [coach, setCoach] = useState<UserCoachDto | null>(null)
  const [profile, setProfile] = useState<ProfileDto | null>(null)
  const router = useRouter();

      useEffect(() => {
          const fetchCoach = async () => {
              
              try {
                  const coachData = await getUserCoach()
                  setCoach(coachData)
              } catch (error) {
                  console.error("Error fetching coach:", error)
              }
          }
  
          fetchCoach()
      }, [getUserCoach])

      useEffect(() => {
          const fetchProfile = async () => {
              
              try {
                  const profileData = await getProfile()
                  setProfile(profileData)
              } catch (error) {
                  console.error("Error fetching coach:", error)
              }
          }
  
          fetchProfile()
      }, [getProfile])

      const handleSubmit = async (): Promise<void> => {
            router.push('http://localhost:3000/page/about')
      };

  const workoutData: WorkoutData = {
    1: [
      { id: 1, order: 1, movement: "Bench Press", reps: "3 × 8-10", sets: "3" },
      { id: 2, order: 2, movement: "Incline Dumbbell Press", reps: "3 × 10-12", sets: "3" },
      { id: 3, order: 3, movement: "Cable Fly", reps: "3 × 12-15", sets: "3" },
      { id: 4, order: 4, movement: "Push Ups", reps: "3 × MAX", sets: "3" },
      { id: 5, order: 5, movement: "Tricep Pushdown", reps: "3 × 12-15", sets: "3" },
    ],
    2: [
      { id: 1, order: 1, movement: "Deadlift", reps: "4 × 5-6", sets: "4" },
      { id: 2, order: 2, movement: "Lat Pulldown", reps: "3 × 8-10", sets: "3" },
      { id: 3, order: 3, movement: "Barbell Row", reps: "3 × 8-10", sets: "3" },
      { id: 4, order: 4, movement: "Face Pull", reps: "3 × 15-20", sets: "3" },
      { id: 5, order: 5, movement: "Hammer Curl", reps: "3 × 10-12", sets: "3" },
    ],
    3: [
      { id: 1, order: 1, movement: "Squat", reps: "4 × 6-8", sets: "4" },
      { id: 2, order: 2, movement: "Leg Press", reps: "3 × 10-12", sets: "3" },
      { id: 3, order: 3, movement: "Leg Extension", reps: "3 × 12-15", sets: "3" },
      { id: 4, order: 4, movement: "Leg Curl", reps: "3 × 12-15", sets: "3" },
      { id: 5, order: 5, movement: "Calf Raise", reps: "4 × 15-20", sets: "4" },
    ],
    4: [
      { id: 1, order: 1, movement: "Military Press", reps: "3 × 8-10", sets: "3" },
      { id: 2, order: 2, movement: "Lateral Raise", reps: "3 × 12-15", sets: "3" },
      { id: 3, order: 3, movement: "Front Raise", reps: "3 × 12-15", sets: "3" },
      { id: 4, order: 4, movement: "Shrugs", reps: "3 × 12-15", sets: "3" },
      { id: 5, order: 5, movement: "Upright Row", reps: "3 × 10-12", sets: "3" },
    ],
    5: [
      { id: 1, order: 1, movement: "Pull Ups", reps: "3 × MAX", sets: "3" },
      { id: 2, order: 2, movement: "T-Bar Row", reps: "3 × 8-10", sets: "3" },
      { id: 3, order: 3, movement: "Seated Row", reps: "3 × 10-12", sets: "3" },
      { id: 4, order: 4, movement: "Preacher Curl", reps: "3 × 10-12", sets: "3" },
      { id: 5, order: 5, movement: "Concentration Curl", reps: "3 × 12-15", sets: "3" },
    ],
  };

  const [currentDay, setCurrentDay] = useState<WorkoutDay>(1);
  const currentWorkout = workoutData[currentDay];

  const nextDay = () => {
    setCurrentDay((prev) => (prev < 5 ? ((prev + 1) as WorkoutDay) : 1));
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev > 1 ? ((prev - 1) as WorkoutDay) : 5));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-4 md:p-6">
      {error === 'NO CONTENT' ? (
      <div>
        <p>Chose your one coach</p>
        <AppButton onClick={handleSubmit}>Explore Coaches</AppButton>
      </div>
      ) : (
      <div className="mb-8 p-4 bg-gray-800/30 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{coach?.username}</h2>
            <p className="text-gray-400">{profile?.createdAt}</p>
          </div>
          <Cart
            imgSrc={coach?.imgUrl ?? "/leonkennedy.jpg"}
            imgAlt={coach?.name ?? ""}
            title={coach?.name ?? ""}
            variant="neutral"
            tone="secondary"
            size="sm"
            className="rounded-4xl"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-700/50 rounded-full">{profile?.age}</span>
          <span className="px-3 py-1 bg-gray-700/50 rounded-full">Height: {profile?.height}</span>
          <span className="px-3 py-1 bg-gray-700/50 rounded-full">Weight: {profile?.weight}</span>
          <span className="px-3 py-1 bg-gray-700/50 rounded-full">Size: {profile?.size}</span>
        </div>
      </div>
      )}
      <div className="bg-gray-800/20 rounded-xl p-4 md:p-6">
        <h3 className="text-xl font-bold mb-6 text-center text-amber-400">
          Program - Click to see how to do each exercise
        </h3>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <NavButton 
            variant="left" 
            size="sm" 
            tone="secondary"
            onClick={prevDay}
          />
          
          <div className="text-center">
            <span className="text-2xl font-bold">Day: {currentDay}</span>
            <p className="text-gray-400 text-sm mt-1">
              {currentDay === 1 && "Chest & Triceps"}
              {currentDay === 2 && "Back & Biceps"}
              {currentDay === 3 && "Legs"}
              {currentDay === 4 && "Shoulders"}
              {currentDay === 5 && "Back & Arms"}
            </p>
          </div>
          
          <NavButton 
            variant="right" 
            size="sm" 
            tone="secondary"
            onClick={nextDay}
          />
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Movement</th>
                <th className="py-3 px-4 text-left">Sets × Reps</th>
                <th className="py-3 px-4 text-left">Sets</th>
              </tr>
            </thead>
            <tbody>
              {currentWorkout.map((exercise: Exercise) => (
                <tr 
                  key={exercise.id} 
                  className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{exercise.order}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{exercise.movement}</span>
                  </td>
                  <td className="py-3 px-4 text-amber-400">{exercise.reps}</td>
                  <td className="py-3 px-4">{exercise.sets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-4 bg-gray-800/20 rounded-lg">
          <h4 className="font-bold mb-2">Description:</h4>
          <pre className="text-gray-300 whitespace-pre-wrap text-sm">
            {currentDay === 1 && "Focus on proper form and full range of motion. Rest 60-90 seconds between sets. Warm up thoroughly before heavy bench pressing."}
            {currentDay === 2 && "Maintain strict form on deadlifts. Engage your core throughout each exercise. Focus on mind-muscle connection during back movements."}
            {currentDay === 3 && "Leg day requires proper warm-up and stretching. Maintain controlled movements. Stay hydrated and focus on breathing during squats."}
            {currentDay === 4 && "Shoulder training requires light weights with perfect form. Avoid swinging. Focus on rear delt development for balanced shoulders."}
            {currentDay === 5 && "Back width and thickness focus. Use straps for heavy pulling movements. Squeeze at peak contraction for maximum muscle activation."}
          </pre>
        </div>
      </div>
    </div>
  );
}