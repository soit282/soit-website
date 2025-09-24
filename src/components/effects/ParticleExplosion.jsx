import React, { useEffect, useRef, useState } from 'react';
import './ParticleExplosion.css';

class Particle {
  constructor(x, y, canvas, options = {}) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;

    const velocity = options.velocity || Math.random() * 12 + 5;
    const angle = options.angle || Math.random() * Math.PI * 2;

    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity - 10; // Start with upward velocity

    this.size = options.size || Math.random() * 30 + 20;
    this.initialSize = this.size;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.1;

    this.life = 1;
    this.gravity = options.gravity || 0.5;
    this.createdTime = Date.now();
    this.fadeDelay = 3000;
    this.bounceCount = 0;
    this.maxBounces = 3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    const floorY = this.canvas.height - 50;

    if (this.y + this.size/2 >= floorY) {
      this.y = floorY - this.size/2;

      if (Math.abs(this.vy) > 2 && this.bounceCount < this.maxBounces) {
        this.vy = -this.vy * 0.7;
        this.vx *= 0.85;
        this.bounceCount++;
        this.rotationSpeed *= 0.8;
      } else {
        this.vy = 0;
        this.vx *= 0.95;
        this.rotationSpeed *= 0.9;
      }
    } else {
      this.vy += this.gravity;
    }

    this.vx *= 0.99;
    this.rotation += this.rotationSpeed;

    const elapsed = Date.now() - this.createdTime;
    if (elapsed > this.fadeDelay) {
      this.life -= 0.015;
    }

    // Keep size constant - no scaling
    this.size = this.initialSize;
  }

  draw(ctx, image) {
    if (!image) return;

    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.drawImage(
      image,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );

    ctx.restore();
  }

  isDead() {
    return this.life <= 0 || this.size <= 0.5;
  }
}

const ParticleExplosion = ({ trigger, position = { x: 0, y: 0 } }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/icon/emoji/vacation.svg';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (trigger > 0 && imageLoaded) {
      createExplosion();
    }
  }, [trigger, imageLoaded]);

  const createExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = position.x;
    const y = position.y;

    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(x, y, canvas, { velocity: 15 }));
    }

    if (!animationRef.current) {
      animate();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((particle) => {
      if (!particle.isDead()) {
        particle.update();
        particle.draw(ctx, imageRef.current);
        return true;
      }
      return false;
    });

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  };

  return <canvas ref={canvasRef} className="particle-explosion-canvas" />;
};

export default ParticleExplosion;