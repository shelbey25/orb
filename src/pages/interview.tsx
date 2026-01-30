'use client';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import StarBackground from '../components/StarBackground';

const retellClient = new RetellWebClient();

export default function Interview() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [agentTranscript, setAgentTranscript] = useState('');
  const [showDevMenu, setShowDevMenu] = useState(false);

  useEffect(() => {
    if (!isCallActive) return;

    // Listen for agent speaking state
    const handleAgentStartSpeaking = () => {
      console.log('Agent started speaking');
      setIsAgentSpeaking(true);
    };

    const handleAgentStopSpeaking = () => {
      console.log('Agent stopped speaking');
      setIsAgentSpeaking(false);
    };

    // Listen for agent message updates
    const handleAgentMessage = (message: any) => {
      console.log('Agent message:', message);
      
      // Extract agent message from transcript array
      if (message.transcript && Array.isArray(message.transcript)) {
        // Find the most recent agent message
        const agentMessages = message.transcript
          .filter((msg: any) => msg.role === 'agent')
          .map((msg: any) => msg.content)
          .join('');
        
        console.log('Extracted agent text:', agentMessages);
        setAgentTranscript(agentMessages);
      }
    };

    retellClient.on('agent_start_talking', handleAgentStartSpeaking);
    retellClient.on('agent_stop_talking', handleAgentStopSpeaking);
    retellClient.on('update', handleAgentMessage);

    return () => {
      retellClient.off('agent_start_talking', handleAgentStartSpeaking);
      retellClient.off('agent_stop_talking', handleAgentStopSpeaking);
      retellClient.off('update', handleAgentMessage);
    };
  }, [isCallActive]);

  const handleStartInterview = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call your backend to create a web call
      const response = await fetch('/api/retell/create-web-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to create web call`);
      }

      const data = await response.json();
      console.log('Web call created:', data);
      
      const { access_token } = data;

      if (!access_token) {
        throw new Error('No access token received from server');
      }

      console.log('Starting Retell call with token...');
      
      // Start the Retell web call
      const call = await retellClient.startCall({
        accessToken: access_token,
      });

      console.log('Call started successfully:', call);
      setIsCallActive(true);
      setAgentTranscript("Hello! I'm ready to chat. Click me to end the call.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error starting interview:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    retellClient.stopCall();
    setIsCallActive(false);
    setIsAgentSpeaking(false);
    setAgentTranscript('');
  };

  const toggleCall = () => {
    if (isCallActive) {
      handleEndCall();
    } else {
      handleStartInterview();
    }
  };

  const statusText = !isCallActive 
    ? (isLoading ? "Establishing Connection..." : "") 
    : "";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black text-white selection:bg-purple-500 selection:text-white">
      <StarBackground />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 w-full p-6 flex justify-between items-center">
         <div onClick={() => router.push('/')} className="cursor-pointer text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
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
      </header>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 flex-1 my-auto">
        
        {/* Status Indicator Area */}
        <div className="h-12 mb-8 flex items-center justify-center">
            {statusText && (
                 <p className="text-xl md:text-2xl font-light tracking-wide text-purple-300 animate-pulse">
                    {statusText}
                </p>
            )}
            {error && (
                <p className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">{error}</p>
            )}
        </div>

        {/* The Interaction Orb Container */}
        <div className="mb-12 relative flex justify-center">
            <div className="relative group cursor-pointer" onClick={toggleCall} role="button" tabIndex={0}>
            {/* Outer glow rings - Kept from original design */}
            <div className={`absolute inset-0 rounded-full blur-[60px] transition-all duration-[1500ms] ease-in-out
                ${isCallActive 
                ? (isAgentSpeaking ? 'bg-fuchsia-600/40 scale-150' : 'bg-blue-600/30 scale-125') 
                : 'bg-purple-600/20 scale-100 group-hover:bg-purple-600/30 group-hover:scale-110'
                }`} 
            />
            
            {/* Main Orb - Locked Design */}
            <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative overflow-hidden orb
                ${!isCallActive ? 'orb-idle' : ''}
                ${isCallActive && !isAgentSpeaking ? 'orb-active-listening' : ''}
                ${isCallActive && isAgentSpeaking ? 'orb-speaking' : ''}
            `}>
                {/* Audio Visualizer */}
                {isCallActive && isAgentSpeaking && (
                <div className="relative z-10 flex items-end gap-1.5 h-12">
                    <div className="w-1 bg-white/90 rounded-full audio-bar" style={{ animationDelay: '0s' }} />
                    <div className="w-1 bg-white/90 rounded-full audio-bar" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 bg-white/90 rounded-full audio-bar" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 bg-white/90 rounded-full audio-bar" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1 bg-white/90 rounded-full audio-bar" style={{ animationDelay: '0.05s' }} />
                </div>
                )}
                
                {/* Center Status Text */}
                {(!isCallActive || isLoading) && (
                <div className="relative z-10 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="font-bold text-lg tracking-widest uppercase text-white/80">
                    {isLoading ? 'Loading' : 'Start'}
                    </span>
                    {!isLoading && (
                    <span className="text-xs text-white/50 font-light tracking-wide uppercase">
                        Tap into the Orb
                    </span>
                    )}
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Transcript Area - Fixed position below orb, no longer overlaying */}
        <div className="w-full min-h-[120px] flex items-start justify-center">
            <div className={`transition-all duration-500 transform ${isCallActive && agentTranscript ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {agentTranscript && (
                    <div className="text-center max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                        <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                            "{agentTranscript}"
                        </p>
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* Footer / Controls Hint */}
      <div className="relative z-10 h-24 flex items-center justify-center">
          {isCallActive && (
              <button 
                onClick={handleEndCall}
                className="text-xs tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors border border-red-900/30 bg-red-900/10 px-6 py-2 rounded-full"
              >
                  End Session
              </button>
          )}
      </div>

      {/* Dev Menu Button - Outside main container */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
            onClick={() => setShowDevMenu(!showDevMenu)}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition opacity-20 hover:opacity-100"
        >
            🐞
        </button>
        
        {showDevMenu && (
            <div className="absolute bottom-12 right-0 bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-xl w-64 flex flex-col gap-2">
                <h3 className="text-sm font-bold text-gray-400 mb-2">Dev Controls</h3>
                
                <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => setIsCallActive(!isCallActive)}
                        className={`text-xs p-2 rounded ${isCallActive ? 'bg-green-600' : 'bg-gray-700'}`}
                    >
                        Toggle Call
                    </button>
                    
                     <button 
                        onClick={() => setIsAgentSpeaking(!isAgentSpeaking)}
                        disabled={!isCallActive}
                        className={`text-xs p-2 rounded ${isAgentSpeaking ? 'bg-red-600' : 'bg-gray-700'} disabled:opacity-50`}
                    >
                        Toggle Speaking
                    </button>
                </div>

                <button 
                    onClick={() => setAgentTranscript("This is a simulated message from the orb entity. It is testing the subtitle system to ensure it does not overlap with the visual elements.")}
                     className="text-xs p-2 rounded bg-blue-900 hover:bg-blue-800 text-left"
                >
                    Simulate Text Long
                </button>
                
                 <button 
                    onClick={() => setAgentTranscript("Hello there.")}
                     className="text-xs p-2 rounded bg-blue-900 hover:bg-blue-800 text-left"
                >
                    Simulate Text Short
                </button>
                
                <button 
                    onClick={() => setAgentTranscript("")}
                     className="text-xs p-2 rounded bg-gray-700 hover:bg-gray-600 text-left"
                >
                    Clear Text
                </button>
            </div>
        )}
      </div>
    </main>
  );
}
