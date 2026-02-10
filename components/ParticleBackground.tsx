
import React, { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  ANIMATED PARTICLE BACKGROUND                                       */
/*  Dark-blue dots drifting on a black canvas with faint connections.   */
/*  Renders behind all content via position: fixed + z-index: 0.       */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const createParticles = () => {
      /* ~1 dot per 12 000 px² — enough density without killing perf */
      const count = Math.min(Math.floor((w * h) / 12000), 200);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
      }));
    };

    const CONNECTION_DIST = 140;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      /* --- connections --- */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;                     // skip sqrt for perf
          if (dist < CONNECTION_DIST * CONNECTION_DIST) {
            const alpha = 0.06 * (1 - Math.sqrt(dist) / CONNECTION_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(30, 58, 138, ${alpha})`;  // dark blue lines
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* --- dots --- */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        /* wrap around */
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 64, 175, ${p.opacity})`;    // dark blue dots
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => { resize(); createParticles(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
