'use client';

import { useRouter } from 'next/router';
import StarBackground from '../components/StarBackground';
import ArchetypeGraph from '../components/ArchetypeGraph';

export default function Profile() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white selection:bg-purple-500 selection:text-white">
      <StarBackground />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div 
          onClick={() => router.push('/')} 
          className="cursor-pointer text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          ORB
        </div>
        <div className="flex items-center gap-4">
           {/* Profile Picture Placeholder - linking to profile (current page) */}
           <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
             <div className="h-full w-full rounded-full bg-black overflow-hidden relative">
                {/* SVG Avatar Placeholder */}
                <svg className="absolute inset-0 h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             </div>
           </div>
        </div>
      </nav>

      <div className="relative z-10 w-full h-[calc(100vh-100px)] flex flex-col">
        <section className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-6 md:left-12 z-20">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                    Archetype Breakdown
                    <span className="text-xs font-normal px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Beta</span>
                </h2>
            </div>
            
            <ArchetypeGraph className="w-full h-full" />
        </section>
      </div>
    </main>
  );
}
