
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  PARTICLE BACKGROUND — optimized for performance                    */
/*  Viewport-only canvas, spatial grid for O(n) connections            */
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
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const location = useLocation();
  const isMedSpa = location.pathname === '/medspa';

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
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const createParticles = () => {
      // Far fewer particles — max 80 instead of 200
      const count = Math.min(Math.floor((w * h) / 25000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
      }));
    };

    const CONNECTION_DIST = 120;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_RADIUS = 150;
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
    const MOUSE_FORCE = 0.6;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // --- connections (use squared distance, skip sqrt) ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST_SQ) {
            const alpha = 0.06 * (1 - Math.sqrt(distSq) / CONNECTION_DIST);
            ctx.beginPath();
            // Soft rose for med spa (visible on light bg), blue for main site
            ctx.strokeStyle = isMedSpa ? `rgba(225, 120, 145, ${alpha * 1.5})` : `rgba(56, 130, 200, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // --- dots ---
      for (const p of particles) {
        // Mouse repulsion (squared distance, no sqrt unless needed)
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouseSq = dxm * dxm + dym * dym;
        if (distMouseSq < MOUSE_RADIUS_SQ && distMouseSq > 0) {
          const distMouse = Math.sqrt(distMouseSq);
          const force = (1 - distMouse / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dxm / distMouse) * force;
          p.vy += (dym / distMouse) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 4) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft rose for med spa (visible on light bg), blue for main site
        ctx.fillStyle = isMedSpa ? `rgba(225, 120, 145, ${p.opacity * 0.8})` : `rgba(56, 150, 220, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => { resize(); createParticles(); });
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMedSpa]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
