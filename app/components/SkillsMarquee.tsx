"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

interface SkillsMarqueeProps {
  skills: string[];
}

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  // Filter out empty skills just in case
  const validSkills = skills.filter(Boolean);

  // If there are less than 8 skills, we use the full list for both rows (just reversed for bottom).
  // Otherwise we split them cleanly in half for diverse rows.
  const half = Math.ceil(validSkills.length / 2);
  const isLarge = validSkills.length >= 8;
  const topSkills = isLarge ? validSkills.slice(0, half) : validSkills;
  const bottomSkills = isLarge ? validSkills.slice(half) : [...validSkills].reverse();

  if (validSkills.length === 0) {
    return (
      <div style={{ opacity: 0.6 }}>
         Les compétences ajoutées dans Supabase s'afficheront ici.
      </div>
    );
  }

  return (
    <div className="skills-marquee-container">
      <MarqueeRow items={topSkills} direction="forward" />
      <MarqueeRow items={bottomSkills} direction="backward" />
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: string[]; direction: "forward" | "backward" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        direction,
        speed: 0.8,
        stopOnInteraction: false, // the plugin temporarily pauses during interaction and auto-resumes!
        stopOnMouseEnter: true, // Pauses when cursor is hovering over it
      }),
    ]
  );
  
  const [isPointerDown, setIsPointerDown] = useState(false);

  const onPointerDown = useCallback(() => setIsPointerDown(true), []);
  const onPointerUp = useCallback(() => setIsPointerDown(false), []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onPointerDown, onPointerUp]);

  return (
    <div
      className={`embla ${isPointerDown ? "is-dragging" : ""}`}
      ref={emblaRef}
    >
      <div className="embla__container">
        {/* We duplicate the arrays a few times to fill screen natively for ultra-wide setups before loop kicks in */}
        {[...items, ...items, ...items, ...items, ...items].map((skill, index) => (
          <div className="embla__slide" key={`${skill}-${index}`}>
            <span className="skill-badge">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
