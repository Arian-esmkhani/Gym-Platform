import { gymPicItems } from "../lib/data";
import { InfiniteSlider } from "../ui/carousel";

export function GymPyc() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900">
      {/* Glowing background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Elegant title with accent */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              PREMIUM FACILITY
            </span>
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50"></div>
          </div>
        </div>
        
        {/* Sophisticated description */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-xl md:text-2xl text-center leading-relaxed">
            <span className="text-white font-medium">Experience our </span>
            <span className="text-amber-300 font-semibold">expansive, state-of-the-art</span>
            <span className="text-white font-medium"> facility designed for </span>
            <span className="text-orange-300 font-semibold">exceptional in-person training</span>
            <span className="text-white font-medium"> sessions that elevate performance.</span>
          </p>
        </div>
        
        {/* Slider with dark frame */}
        <div className="mb-20 px-2 md:px-8">
          <div className="relative rounded-2xl overflow-hidden p-0.5 bg-linear-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20">
            <div className="bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <InfiniteSlider items={gymPicItems} />
            </div>
          </div>
        </div>
        
        {/* Elegant contact section */}
        <div className="flex flex-col items-center">
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 
                        bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg 
                        border border-gray-700/50 px-10 py-6 rounded-2xl 
                        shadow-2xl hover:border-amber-500/30 transition-all duration-300">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-900/30 to-amber-700/20 
                            flex items-center justify-center border border-amber-500/20">
                <span className="text-amber-400 text-xl">📍</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium tracking-wider">VISIT US</p>
                <p className="text-white font-semibold text-lg">1234 Olympic Blvd</p>
                <p className="text-gray-300 text-sm">Los Angeles, CA 90015</p>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="w-px h-12 bg-linear-to-b from-gray-600 via-amber-500/50 to-gray-600"></div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-900/30 to-orange-700/20 
                            flex items-center justify-center border border-orange-500/20">
                <span className="text-orange-400 text-xl">📞</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium tracking-wider">CALL NOW</p>
                <p className="text-white font-semibold text-lg">(555) 123-4567</p>
                <p className="text-gray-300 text-sm">Available 24/7</p>
              </div>
            </div>
            
          </div>
          
          {/* CTA button with glow */}
          <div className="mt-10 relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-600 to-orange-600 rounded-full blur opacity-20 
                          group-hover:opacity-30 transition duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}