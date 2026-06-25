"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Dumbbell, User, Menu, Ghost} from "lucide-react";

const Routes = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/page/about', label: 'About', icon: Info },
  { path: '/page/exercise', label: 'Exercise', icon: Dumbbell },  
  { path: '/page/profile', label: 'Profile', icon: User },
  { path: '/page/test', label: 'Test', icon: User },
];
const Login = Ghost

export function AppNav() {
  const pathname = usePathname();
  
  return (
    <div className="sticky top-0 z-50">
        <div className="text-center bg-linear-to-r from-zinc-700 to-zinc-800 py-3 px-4 border-b border-zinc-600/30">
        <p className="text-sm font-medium text-gray-100">
            <span className="font-bold text-white mr-2">Auction of the moon</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-gray-200 mr-2">Best time to get program</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-amber-300 font-semibold">First seven days each month</span>
        </p>
        </div>
      
      <nav className="hidden md:block w-full bg-linear-to-b from-gray-900/95 to-gray-900/80 
                    backdrop-blur-lg border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">
              BATIS<span className="text-amber-500">.</span>
            </div>
            
            <div className="flex items-center gap-6"> 
              {Routes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={`text-sm font-medium transition-colors duration-200 relative group
                              ${isActive ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}
                  >
                    {route.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 
                                  transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              })} 
            </div>
          </div>
        </div>
      </nav>
      
      <div className="md:hidden bg-linear-to-b from-gray-900 to-gray-800 py-2.5 px-3">
        <div className="flex items-center justify-between">
          <Link className="text-lg font-bold text-white" href="/" key={"/"}>
            BATIS<span className="text-amber-500">.</span>
          </Link>
            <button 
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Open menu"
                title="Open navigation menu"
                >
                <Menu size={20} />
            </button>
        </div>
        <div>
          <Link href={"/page/login"}>
              <Login size={18} />
              
          </Link>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/97 backdrop-blur-md 
                     border-t border-gray-800/60 py-2">
        <div className="flex justify-around items-center px-1">
          {Routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className="flex flex-col items-center transition-all duration-200 active:scale-95"
              >
                <div className={`p-1.5 rounded-lg mb-0.5 ${isActive ? 'bg-amber-500/20' : ''}`}>
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-amber-400' : 'text-gray-400'} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-amber-400' : 'text-gray-400'}`}>
                  {route.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="md:hidden h-16"></div>
    </div>
  );
}