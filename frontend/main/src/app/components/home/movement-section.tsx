"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const hexagonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const muscleGroups = [
  { id: 1, title: "CHEST", img: "/Survival.jpg" },
  { id: 2, title: "BACK", img: "/Survival.jpg" },
  { id: 3, title: "LEGS", img: "/Survival.jpg" },
  { id: 4, title: "SHOULDERS", img: "/Survival.jpg" },
  { id: 5, title: "ARMS", img: "/Survival.jpg" },
  { id: 6, title: "CORE", img: "/Survival.jpg" },
];

export function HexSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const router = useRouter();

  return (
    <section className="py-16 md:py-20 bg-linear-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
          MUSCLE GROUPS
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
          {muscleGroups.map((group, index) => (
            <motion.div
              key={group.id}
              className="flex flex-col items-center relative"
              variants={hexagonVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100 
              }}
              viewport={{ once: true, amount: 0.2 }}
              onMouseEnter={() => setHoveredId(group.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => router.push(`/components/${group.title}/movments`)}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-amber-500/40 to-orange-500/40 blur-xl"
                  style={{
                    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  }}
                  animate={{
                    opacity: hoveredId === group.id ? 0.8 : 0,
                    scale: hoveredId === group.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="w-36 h-36 md:w-44 md:h-44 bg-cover bg-center 
                           shadow-xl"
                  style={{
                    backgroundImage: `url(${group.img})`,
                    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  }}
                  animate={{
                    borderColor: hoveredId === group.id 
                      ? "rgba(245, 158, 11, 0.9)" 
                      : "rgba(245, 158, 11, 0.6)",
                    scale: hoveredId === group.id ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    animate={{
                      opacity: hoveredId === group.id ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 border-2 border-transparent"
                  style={{
                    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  }}
                  animate={{
                    borderColor: hoveredId === group.id 
                      ? "rgba(251, 191, 36, 0.5)" 
                      : "transparent",
                    boxShadow: hoveredId === group.id 
                      ? "0 0 30px 5px rgba(245, 158, 11, 0.3)" 
                      : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <motion.p
                className="mt-5 text-lg md:text-xl font-bold text-white"
                animate={{
                  color: hoveredId === group.id 
                    ? "#f59e0b"
                    : "#ffffff",
                  scale: hoveredId === group.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {group.title}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}