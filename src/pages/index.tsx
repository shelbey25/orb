'use client';

import { useRouter } from 'next/router';
import StarBackground from '../components/StarBackground';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  const handleDiscoverFuture = () => {
    router.push('/interview');
  };

  return (
    <>
    <Head>
        <title>Orb | AI College Admissions Coach</title>
        <meta name="description" content="Orb is your AI companion for college admissions." />
    </Head>
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white selection:bg-purple-500 selection:text-white">
      <StarBackground />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_transparent_50%)] opacity-40 pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          ORB
        </div>
        <div>
           <div 
             onClick={() => router.push('/profile')}
             className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[2px] cursor-pointer hover:scale-105 transition-transform"
             role="button"
             aria-label="Go to Profile"
           >
             <div className="h-full w-full rounded-full bg-black overflow-hidden relative">
                <svg className="absolute inset-0 h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             </div>
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center pb-20">
        
        {/* Animated badge */}
        <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-sm animate-pulse">
            <span className="mr-2 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            AI Admissions Coach
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 md:text-7xl lg:text-8xl">
            Your journey to the <br className="hidden md:block" />
            <span className="text-white">dream college</span> starts here.
        </h1>
        
        <p className="max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed">
            Orb is a one-stop app that uses AI to interview you over the course of your 4 years in high school, matching you with the perfect colleges.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
                onClick={handleDiscoverFuture} 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
                <span className="mr-2">Start Your Journey</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>

        {/* Decorative Orb in Background - Lower opacity, just for vibe */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]" />
        
      </div>
      
      {/* Footer / Stats */}
      <div className="relative z-10 w-full border-t border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
             <p>&copy; {new Date().getFullYear()} Orb Admissions. All rights reserved.</p>
             <div className="flex gap-6">
                 <span>Privacy Policy</span>
                 <span>Terms of Service</span>
             </div>
          </div>
      </div>
    </main>
    </>
  )
}
