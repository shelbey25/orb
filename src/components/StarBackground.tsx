'use client';

import { useEffect, useState } from 'react';

export default function StarBackground() {
  const [stars, setStars] = useState<Array<{ id: number; top: string; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate star positions only on client side to avoid hydration mismatch
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="stars-container overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-blue-900/10 pointer-events-none" />
    </div>
  );
}
