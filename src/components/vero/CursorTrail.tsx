import { useEffect, useRef, useState } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only add trail if mouse moved significantly (reduces trail density)
      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const now = Date.now();
      const timeDelta = now - lastTimeRef.current;

      // Add trail every 30ms or when mouse moves more than 15px
      if (distance > 15 || timeDelta > 30) {
        lastPositionRef.current = { x, y };
        lastTimeRef.current = now;
        
        const newTrail: Trail = {
          x,
          y,
          id: trailIdRef.current++,
          timestamp: now,
        };

        setTrails((prev) => {
          // Keep only recent trails (last 15)
          const filtered = prev.filter((t) => now - t.timestamp < 1500);
          return [...filtered, newTrail].slice(-15);
        });
      }
    };

    // Cleanup old trails periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrails((prev) => prev.filter((t) => now - t.timestamp < 1500));
    }, 100);

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {trails.map((trail) => {
        const age = Date.now() - trail.timestamp;
        const maxAge = 1500;
        const progress = age / maxAge;
        
        // Fade out and shrink over time
        const opacity = Math.max(0, 1 - progress);
        const scale = Math.max(0.3, 1 - progress * 0.7);
        
        return (
          <div
            key={trail.id}
            className="absolute"
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity * 0.6,
              pointerEvents: 'none',
            }}
          >
            {/* Main glow */}
            <div
              className="absolute rounded-full bg-gradient-to-br from-foreground/30 to-foreground/10 dark:from-foreground/20 dark:to-foreground/5"
              style={{
                width: '100px',
                height: '100px',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(30px)',
              }}
            />
            
            {/* Inner bright spot */}
            <div
              className="absolute rounded-full bg-foreground/40 dark:bg-foreground/20"
              style={{
                width: '40px',
                height: '40px',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(15px)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
