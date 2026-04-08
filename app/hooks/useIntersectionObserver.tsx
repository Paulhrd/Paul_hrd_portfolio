"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (triggerOnce && isElementIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(currentRef);
        } else if (!triggerOnce) {
          setIsIntersecting(isElementIntersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
}

// Helper component to wrap elements with the animation
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  
  const delayClass = delay === 100 ? "delay-100" 
    : delay === 200 ? "delay-200" 
    : delay === 300 ? "delay-300"
    : delay === 400 ? "delay-400"
    : "";

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${delayClass} ${isIntersecting ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
