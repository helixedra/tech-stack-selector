"use client";

import { useEffect, useRef, useState } from "react";

export default function GlowGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Draw gradient and noise
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create gradient
    const drawGradient = () => {
      // Calculate gradient center based on mouse position with dampening
      const centerX = mousePosition.x * 0.1 + (dimensions.width / 2) * 0.9;
      const centerY = mousePosition.y * 0.1 + (dimensions.height / 2) * 0.9;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        dimensions.width * 0.8
      );

      // Beautiful color stops for the gradient
      gradient.addColorStop(0, "#ff7eb3"); // Pink
      gradient.addColorStop(0.3, "#7b68ee"); // Purple
      gradient.addColorStop(0.6, "#2e8bc0"); // Blue
      gradient.addColorStop(1, "#0d324d"); // Dark blue

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    };

    // Add noise texture
    const addNoise = () => {
      const imageData = ctx.getImageData(
        0,
        0,
        dimensions.width,
        dimensions.height
      );
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Generate noise with low opacity for subtle effect
        const noise = Math.random() * 10 - 5;

        // Apply noise to RGB channels
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      drawGradient();
      addNoise();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, mousePosition]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay */}
    </div>
  );
}
