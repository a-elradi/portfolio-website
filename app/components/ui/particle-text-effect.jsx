"use client";

import { useEffect, useRef } from "react";

// Brand palette (teal/cyan/white) so the intro matches the portfolio theme.
const DEFAULT_PALETTE = [
  { r: 45, g: 212, b: 191 }, // teal-400
  { r: 6, g: 182, b: 212 }, // teal-500 / cyan
  { r: 255, g: 255, b: 255 }, // white
];

class Particle {
  pos = { x: 0, y: 0 };
  vel = { x: 0, y: 0 };
  acc = { x: 0, y: 0 };
  target = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;

  startColor = { r: 0, g: 0, b: 0 };
  targetColor = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2));

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx, drawAsPoints) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };

    if (drawAsPoints) {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    } else {
      ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width, height) {
    if (!this.isKilled) {
      const randomPos = generateRandomPos(width / 2, height / 2, (width + height) / 2, width, height);
      this.target.x = randomPos.x;
      this.target.y = randomPos.y;

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 0, g: 0, b: 0 };
      this.colorWeight = 0;

      this.isKilled = true;
    }
  }
}

function generateRandomPos(x, y, mag, width, height) {
  const randomX = Math.random() * width;
  const randomY = Math.random() * height;

  const direction = {
    x: randomX - x,
    y: randomY - y,
  };

  const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
  if (magnitude > 0) {
    direction.x = (direction.x / magnitude) * mag;
    direction.y = (direction.y / magnitude) * mag;
  }

  return {
    x: x + direction.x,
    y: y + direction.y,
  };
}

// Shrinks the font until `text` fits within maxWidth.
function fitFontSize(ctx, text, maxWidth, maxHeight) {
  let fontSize = Math.floor(maxHeight * 0.2);
  ctx.font = `900 ${fontSize}px Arial, sans-serif`;
  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize -= 2;
    ctx.font = `900 ${fontSize}px Arial, sans-serif`;
  }
  return fontSize;
}

const DEFAULT_WORDS = ["HELLO", "21st.dev", "ParticleTextEffect", "BY", "KAINXU"];

export function ParticleTextEffect({
  words = DEFAULT_WORDS,
  palette = DEFAULT_PALETTE,
  frameInterval = 150,
  playOnce = false,
  onComplete,
  className = "",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false });

  const drawAsPoints = true;
  // Reference density tuned against a 1000x500 canvas; scale sampling
  // spacing with canvas area so full-screen text stays legible instead
  // of collapsing into a dense blob of particles.
  const REFERENCE_AREA = 1000 * 500;
  const getPixelSteps = (width, height) => {
    const scale = Math.sqrt((width * height) / REFERENCE_AREA);
    return Math.max(6, Math.round(6 * scale));
  };

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const nextWord = (word, targetCanvas) => {
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = targetCanvas.width;
      offscreenCanvas.height = targetCanvas.height;
      const offscreenCtx = offscreenCanvas.getContext("2d");

      const fontSize = fitFontSize(offscreenCtx, word, targetCanvas.width * 0.86, targetCanvas.height);
      offscreenCtx.fillStyle = "white";
      offscreenCtx.font = `900 ${fontSize}px Arial, sans-serif`;
      offscreenCtx.textAlign = "center";
      offscreenCtx.textBaseline = "middle";
      offscreenCtx.fillText(word, targetCanvas.width / 2, targetCanvas.height / 2);

      const imageData = offscreenCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
      const pixels = imageData.data;

      const newColor = palette[wordIndexRef.current % palette.length];

      const particles = particlesRef.current;
      let particleIndex = 0;

      const pixelSteps = getPixelSteps(targetCanvas.width, targetCanvas.height);
      const coordsIndexes = [];
      for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
        coordsIndexes.push(i);
      }

      for (let i = coordsIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
      }

      for (const coordIndex of coordsIndexes) {
        const pixelIndex = coordIndex;
        const alpha = pixels[pixelIndex + 3];

        if (alpha > 0) {
          const x = (pixelIndex / 4) % targetCanvas.width;
          const y = Math.floor(pixelIndex / 4 / targetCanvas.width);

          let particle;

          if (particleIndex < particles.length) {
            particle = particles[particleIndex];
            particle.isKilled = false;
            particleIndex++;
          } else {
            particle = new Particle();

            const randomPos = generateRandomPos(
              targetCanvas.width / 2,
              targetCanvas.height / 2,
              (targetCanvas.width + targetCanvas.height) / 2,
              targetCanvas.width,
              targetCanvas.height
            );
            particle.pos.x = randomPos.x;
            particle.pos.y = randomPos.y;

            particle.maxSpeed = Math.random() * 6 + 4;
            particle.maxForce = particle.maxSpeed * 0.05;
            particle.particleSize = Math.random() * 6 + 6;
            particle.colorBlendRate = Math.random() * 0.0275 + 0.0025;

            particles.push(particle);
          }

          particle.startColor = {
            r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
            g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
            b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
          };
          particle.targetColor = newColor;
          particle.colorWeight = 0;

          particle.target.x = x;
          particle.target.y = y;
        }
      }

      for (let i = particleIndex; i < particles.length; i++) {
        particles[i].kill(targetCanvas.width, targetCanvas.height);
      }
    };

    const animate = () => {
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;

      ctx.fillStyle = "rgba(3, 0, 20, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.move();
        particle.draw(ctx, drawAsPoints);

        if (particle.isKilled) {
          if (
            particle.pos.x < 0 ||
            particle.pos.x > canvas.width ||
            particle.pos.y < 0 ||
            particle.pos.y > canvas.height
          ) {
            particles.splice(i, 1);
          }
        }
      }

      if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
        particles.forEach((particle) => {
          const distance = Math.sqrt(
            Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2)
          );
          if (distance < 50) {
            particle.kill(canvas.width, canvas.height);
          }
        });
      }

      frameCountRef.current++;
      if (frameCountRef.current % frameInterval === 0) {
        const isLastWord = wordIndexRef.current === words.length - 1;
        if (isLastWord && playOnce) {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onCompleteRef.current && onCompleteRef.current();
          }
        } else {
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          nextWord(words[wordIndexRef.current], canvas);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      nextWord(words[wordIndexRef.current], canvas);
    };

    resize();
    animate();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    const handleMouseDown = (e) => {
      mouseRef.current.isPressed = true;
      mouseRef.current.isRightClick = e.button === 2;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
      mouseRef.current.isRightClick = false;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("contextmenu", handleContextMenu);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("contextmenu", handleContextMenu);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
