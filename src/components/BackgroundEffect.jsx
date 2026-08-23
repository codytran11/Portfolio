import { useEffect, useRef } from "react";
import "./BackgroundEffect.css";

function BackgroundEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let particles = [];

    const mouse = {
      x: null,
      y: null,
    };

    const ambientParticleCount = 120;

    function circlePoints(cx, cy, radius, count) {
      const points = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;

        points.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        });
      }

      return points;
    }

    function ellipsePoints(cx, cy, radiusX, radiusY, count) {
      const points = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;

        points.push({
          x: cx + Math.cos(angle) * radiusX,
          y: cy + Math.sin(angle) * radiusY,
        });
      }

      return points;
    }

    function linePoints(x1, y1, x2, y2, count) {
      const points = [];

      for (let i = 0; i < count; i++) {
        const t = i / Math.max(count - 1, 1);

        points.push({
          x: x1 + (x2 - x1) * t,
          y: y1 + (y2 - y1) * t,
        });
      }

      return points;
    }

    function rectanglePoints(x, y, width, height, countPerSide) {
      return [
        ...linePoints(x, y, x + width, y, countPerSide),
        ...linePoints(x + width, y, x + width, y + height, countPerSide),
        ...linePoints(x + width, y + height, x, y + height, countPerSide),
        ...linePoints(x, y + height, x, y, countPerSide),
      ];
    }

    function curvePoints(start, end, control, count) {
      const points = [];

      for (let i = 0; i < count; i++) {
        const t = i / Math.max(count - 1, 1);
        const inverse = 1 - t;

        points.push({
          x:
            inverse * inverse * start.x +
            2 * inverse * t * control.x +
            t * t * end.x,

          y:
            inverse * inverse * start.y +
            2 * inverse * t * control.y +
            t * t * end.y,
        });
      }

      return points;
    }

    function createMotif(x, y, scale, points) {
      return points.map((point) => ({
        targetX: x + point.x * scale,
        targetY: y + point.y * scale,

        x: x + point.x * scale + (Math.random() - 0.5) * 2.5,

        y: y + point.y * scale + (Math.random() - 0.5) * 2.5,

        size: Math.random() * 1.7 + 0.7,
        opacity: Math.random() * 0.13 + 0.08,

        phase: Math.random() * Math.PI * 2,

        isMotif: true,
      }));
    }

    function createParticles() {
      const width = canvas.width;
      const height = canvas.height;

      particles = [];

      for (let i = 0; i < ambientParticleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,

          size: Math.random() * 1.7 + 0.35,
          opacity: Math.random() * 0.12 + 0.025,

          speedX: (Math.random() - 0.5) * 0.18,
          speedY: (Math.random() - 0.5) * 0.18,

          isMotif: false,
        });
      }

      const basketballPoints = [
        ...circlePoints(0, 0, 0.5, 40),

        ...curvePoints(
          { x: -0.18, y: -0.47 },
          { x: -0.18, y: 0.47 },
          { x: -0.3, y: 0 },
          16,
        ),

        ...curvePoints(
          { x: 0.18, y: -0.47 },
          { x: 0.18, y: 0.47 },
          { x: 0.3, y: 0 },
          16,
        ),

        ...linePoints(0, -0.5, 0, 0.5, 16),

        ...curvePoints(
          { x: -0.48, y: 0 },
          { x: 0.48, y: 0 },
          { x: 0, y: 0.12 },
          18,
        ),
      ];

      const football = [
        ...curvePoints(
          { x: -0.65, y: 0 },
          { x: 0.65, y: 0 },
          { x: 0, y: -0.5 },
          26,
        ),

        ...curvePoints(
          { x: -0.65, y: 0 },
          { x: 0.65, y: 0 },
          { x: 0, y: 0.5 },
          26,
        ),

        ...linePoints(-0.2, 0, 0.2, 0, 10),

        ...linePoints(-0.14, -0.08, -0.14, 0.08, 5),

        ...linePoints(-0.07, -0.08, -0.07, 0.08, 5),

        ...linePoints(0, -0.08, 0, 0.08, 5),

        ...linePoints(0.07, -0.08, 0.07, 0.08, 5),

        ...linePoints(0.14, -0.08, 0.14, 0.08, 5),
      ];

      const racket = [
        ...ellipsePoints(0, -0.32, 0.34, 0.48, 30),

        ...ellipsePoints(0, -0.32, 0.27, 0.39, 20),

        ...linePoints(0, 0.14, 0, 0.82, 14),

        ...rectanglePoints(-0.06, 0.82, 0.12, 0.28, 5),

        ...linePoints(-0.19, -0.68, -0.19, 0.02, 8),

        ...linePoints(-0.095, -0.76, -0.095, 0.08, 10),

        ...linePoints(0, -0.79, 0, 0.12, 11),

        ...linePoints(0.095, -0.76, 0.095, 0.08, 10),

        ...linePoints(0.19, -0.68, 0.19, 0.02, 8),

        ...linePoints(-0.27, -0.55, 0.27, -0.55, 8),

        ...linePoints(-0.31, -0.42, 0.31, -0.42, 9),

        ...linePoints(-0.32, -0.29, 0.32, -0.29, 9),

        ...linePoints(-0.29, -0.16, 0.29, -0.16, 8),
      ];

      const birdie = [
        ...ellipsePoints(0.68, 0.02, 0.08, 0.05, 8),

        ...linePoints(0.62, -0.05, 0.49, -0.34, 7),

        ...linePoints(0.74, -0.05, 0.87, -0.34, 7),

        ...linePoints(0.49, -0.34, 0.87, -0.34, 8),

        ...linePoints(0.56, -0.3, 0.64, -0.05, 6),

        ...linePoints(0.68, -0.32, 0.68, -0.05, 6),

        ...linePoints(0.8, -0.3, 0.72, -0.05, 6),
      ];

      const badminton = [...racket, ...birdie];

      const computer = [
        ...rectanglePoints(-0.5, -0.35, 1, 0.68, 13),

        ...linePoints(0, 0.33, 0, 0.68, 8),

        ...linePoints(-0.22, 0.68, 0.22, 0.68, 9),
      ];

      const gameController = [
        ...curvePoints(
          { x: -0.52, y: -0.12 },
          { x: -0.08, y: -0.2 },
          { x: -0.34, y: -0.34 },
          12,
        ),

        ...curvePoints(
          { x: -0.08, y: -0.2 },
          { x: 0.08, y: -0.2 },
          { x: 0, y: -0.14 },
          7,
        ),

        ...curvePoints(
          { x: 0.08, y: -0.2 },
          { x: 0.52, y: -0.12 },
          { x: 0.34, y: -0.34 },
          12,
        ),

        ...curvePoints(
          { x: 0.52, y: -0.12 },
          { x: 0.48, y: 0.38 },
          { x: 0.7, y: 0.1 },
          14,
        ),

        ...curvePoints(
          { x: 0.48, y: 0.38 },
          { x: 0.18, y: 0.22 },
          { x: 0.36, y: 0.42 },
          10,
        ),

        ...curvePoints(
          { x: 0.18, y: 0.22 },
          { x: -0.18, y: 0.22 },
          { x: 0, y: 0.36 },
          10,
        ),

        ...curvePoints(
          { x: -0.18, y: 0.22 },
          { x: -0.48, y: 0.38 },
          { x: -0.36, y: 0.42 },
          10,
        ),

        ...curvePoints(
          { x: -0.48, y: 0.38 },
          { x: -0.52, y: -0.12 },
          { x: -0.7, y: 0.1 },
          14,
        ),

        ...linePoints(-0.29, -0.07, -0.29, 0.15, 7),

        ...linePoints(-0.4, 0.04, -0.18, 0.04, 7),

        ...circlePoints(0.31, -0.03, 0.045, 7),

        ...circlePoints(0.43, 0.08, 0.045, 7),

        ...circlePoints(0.31, 0.19, 0.045, 7),

        ...circlePoints(0.19, 0.08, 0.045, 7),

        ...circlePoints(-0.1, 0.12, 0.06, 8),

        ...circlePoints(0.03, 0.12, 0.06, 8),
      ];

      particles.push(
        ...createMotif(width * 0.075, height * 0.16, 78, basketballPoints),

        ...createMotif(width * 0.9, height * 0.17, 105, football),

        ...createMotif(width * 0.075, height * 0.53, 90, badminton),

        ...createMotif(width * 0.91, height * 0.56, 95, computer),

        ...createMotif(width * 0.87, height * 0.86, 105, gameController),
      );
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      createParticles();
    }

    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    function updateParticles() {
      particles.forEach((particle) => {
        if (particle.isMotif) {
          const time = Date.now() * 0.0008;

          const driftX = Math.sin(time + particle.phase) * 0.7;

          const driftY = Math.cos(time + particle.phase) * 0.7;

          particle.x += (particle.targetX + driftX - particle.x) * 0.018;

          particle.y += (particle.targetY + driftY - particle.y) * 0.018;
        } else {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < -20) {
            particle.x = canvas.width + 20;
          }

          if (particle.x > canvas.width + 20) {
            particle.x = -20;
          }

          if (particle.y < -20) {
            particle.y = canvas.height + 20;
          }

          if (particle.y > canvas.height + 20) {
            particle.y = -20;
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = particle.isMotif ? 140 : 110;

          if (distance < interactionRadius && distance > 0) {
            const force = (interactionRadius - distance) / interactionRadius;

            const strength = particle.isMotif ? 1.8 : 1.2;

            particle.x += (dx / distance) * force * strength;

            particle.y += (dy / distance) * force * strength;
          }
        }
      });
    }

    function drawConnections() {
      if (mouse.x === null || mouse.y === null) {
        return;
      }

      const connectionRadius = 145;
      const candidates = [];

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionRadius) {
          candidates.push({
            particle,
            distance,
          });
        }
      }

      candidates.sort((a, b) => a.distance - b.distance);

      const nearby = candidates.slice(0, 14);

      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const first = nearby[i];
          const second = nearby[j];

          const dx = first.particle.x - second.particle.x;

          const dy = first.particle.y - second.particle.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 100) {
            continue;
          }

          const opacity = Math.max(0, 1 - distance / 100) * 0.22;

          ctx.beginPath();

          ctx.moveTo(first.particle.x, first.particle.y);

          ctx.lineTo(second.particle.x, second.particle.y);

          ctx.strokeStyle = `rgba(
            139,
            92,
            246,
            ${opacity}
          )`;

          ctx.lineWidth = 0.7;

          ctx.stroke();
        }
      }

      nearby.forEach(({ particle, distance }) => {
        const opacity = Math.max(0, 1 - distance / connectionRadius) * 0.3;

        ctx.beginPath();

        ctx.moveTo(mouse.x, mouse.y);

        ctx.lineTo(particle.x, particle.y);

        ctx.strokeStyle = `rgba(
            139,
            92,
            246,
            ${opacity}
          )`;

        ctx.lineWidth = 0.7;

        ctx.stroke();
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections();

      particles.forEach((particle) => {
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        if (particle.isMotif) {
          ctx.fillStyle = `rgba(
            245,
            243,
            255,
            ${particle.opacity}
          )`;
        } else {
          ctx.fillStyle = `rgba(
            235,
            233,
            245,
            ${particle.opacity}
          )`;
        }

        ctx.fill();
      });
    }

    function animate() {
      updateParticles();
      drawParticles();

      animationFrame = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="background-effect" aria-hidden="true" />
  );
}

export default BackgroundEffect;
