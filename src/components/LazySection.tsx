"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  height?: string;
  id?: string;
}

export default function LazySection({ children, height = "300px", id }: LazySectionProps) {
  const [isRendered, setIsRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRendered(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px", // pre-render 300px before coming into view
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} ref={containerRef} style={{ minHeight: isRendered ? "auto" : height }}>
      {isRendered ? children : <div style={{ height }} />}
    </div>
  );
}
