'use client';
import React, { useEffect, useRef } from 'react';

export default function Starfield({ starCount = 1000, speed = 0.05 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
      });
    }

    function animate() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      for (let s of stars) {
        s.z -= speed * width;
        if (s.z <= 0) s.z = width;
        const px = (s.x / s.z) * width + width / 2;
        const py = (s.y / s.z) * height + height / 2;
        const size = (1 - s.z / width) * 3;
        ctx.fillStyle = 'white';
        ctx.fillRect(px, py, size, size);
      }
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    return () => { cancelAnimationFrame(animate); };
  }, [starCount, speed]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
}
