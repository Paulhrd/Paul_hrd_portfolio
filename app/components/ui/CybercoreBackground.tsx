"use client";

import React, { useState, useEffect, CSSProperties } from 'react';

export interface CybercoreBackgroundProps {
  /** Number of animated light beams */
  beamCount?: number;
}

const DEFAULT_BEAM_COUNT = 70;

export const CybercoreBackground: React.FC<CybercoreBackgroundProps> = ({
  beamCount = DEFAULT_BEAM_COUNT,
}) => {
  const [beams, setBeams] = useState<
    Array<{ id: number; type: 'primary' | 'secondary'; style: CSSProperties }>
  >([]);

  useEffect(() => {
    // Generate static beams on mount to avoid hydration mismatch
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 4 + 6;   // 6-10s rise
      const fadeDur = riseDur;                 // sync fade
      const type: 'primary' | 'secondary' = Math.random() < 0.25 ? 'secondary' : 'primary';
      return {
        id: i,
        type,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  if (beams.length === 0) return null; // Wait for hydration before rendering

  return (
    <div
      className="cybercore-scene"
      role="img"
      aria-label="Animated cybercore grid background"
    >
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className={`light-beam ${beam.type}`}
            style={beam.style}
          />
        ))}
      </div>
    </div>
  );
};
