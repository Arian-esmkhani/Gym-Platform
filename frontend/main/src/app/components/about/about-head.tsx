import Image from 'next/image'

export function AboutHead() {
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        <div className="mb-12 md:mb-16">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={"/Survival.jpg"} 
              alt="Batis Gym Facility"
              height={600}
              width={1200}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              BATIS <span className="text-amber-400">GYM</span>
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-gray-300">
              At <span className="text-white font-medium">Batis Fitness</span>, we believe that true strength is built not just in the body, but in the mind and spirit. Founded with a vision to create more than just a gym, we have cultivated a premier training environment where ambition meets excellence, and every member is empowered to surpass their limits.
            </p>
            
            <p className="text-gray-300">
              Our expansive, state-of-the-art facility spans over 20,000 square feet, equipped with cutting-edge training apparatus, dedicated functional zones, and recovery amenities designed to support every phase of your fitness journey. From Olympic lifting platforms and cardio theaters to dedicated stretching areas and recovery lounges, every corner of Batis is engineered for performance, safety, and inspiration.
            </p>
            
            <p className="text-gray-300">
              What sets us apart is our community-first philosophy. We are a collective of athletes, trainers, and wellness enthusiasts united by a shared commitment to growth. Our certified coaches bring decades of combined expertise, offering personalized programming, nutritional guidance, and unwavering support—because we know transformation happens together.
            </p>
            
            <p className="text-gray-300">
              Whether youre taking your first steps toward fitness or training at an elite level, Batis provides the tools, environment, and encouragement to help you write your strongest story. Here, you dont just work out—you evolve.
            </p>
            
            <div className="pt-8 border-t border-gray-800">
              <p className="text-xl text-white font-semibold">
                Welcome to Batis. Where strength is cultivated, goals are realized, and every rep counts.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gray-800/30 rounded-xl">
              <div className="text-3xl font-bold text-amber-400">20,000+</div>
              <div className="text-gray-400 mt-2">Square Feet Facility</div>
            </div>
            <div className="p-6 bg-gray-800/30 rounded-xl">
              <div className="text-3xl font-bold text-amber-400">100+</div>
              <div className="text-gray-400 mt-2">Certified Coaches</div>
            </div>
            <div className="p-6 bg-gray-800/30 rounded-xl">
              <div className="text-3xl font-bold text-amber-400">24/7</div>
              <div className="text-gray-400 mt-2">Support & Access</div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}