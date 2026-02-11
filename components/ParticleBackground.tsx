
import React, { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  INTERACTIVE PARTICLE BACKGROUND                                    */
/*  Particles drift + react to mouse cursor (repel + glow near cursor) */
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
    const MOUSE_RADIUS = 200;
    const MOUSE_FORCE = 0.8;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + window.scrollY;

      /* --- connections --- */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < CONNECTION_DIST * CONNECTION_DIST) {
            const d = Math.sqrt(dist);
            const alpha = 0.06 * (1 - d / CONNECTION_DIST);

            /* Glow connections near cursor */
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            const nearMouse = mouseDist < MOUSE_RADIUS;

            ctx.beginPath();
            ctx.strokeStyle = nearMouse
              ? `rgba(6, 182, 212, ${alpha * 3})`
              : `rgba(30, 58, 138, ${alpha})`;
            ctx.lineWidth = nearMouse ? 1 : 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* --- dots --- */
      for (const p of particles) {
        /* Mouse repulsion */
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < MOUSE_RADIUS && distMouse > 0) {
          const force = (1 - distMouse / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dxm / distMouse) * force;
          p.vy += (dym / distMouse) * force;
        }

        /* Dampen velocity */
        p.vx *= 0.98;
        p.vy *= 0.98;

        /* Clamp speed */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        /* Glow dots near cursor */
        const nearCursor = distMouse < MOUSE_RADIUS;

        ctx.beginPath();
        ctx.arc(p.x, p.y, nearCursor ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = nearCursor
          ? `rgba(6, 182, 212, ${p.opacity * 2})`
          : `rgba(30, 64, 175, ${p.opacity})`;
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
