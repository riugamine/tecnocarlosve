'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave properties based on theme
    const getWaveColors = () => {
      return theme === 'dark' 
        ? [
            { y: 0.3, length: 0.5, amplitude: 50, speed: 0.03, color: '#2DD4BF' },
            { y: 0.4, length: 0.7, amplitude: 30, speed: 0.045, color: '#14B8A6' },
            { y: 0.5, length: 0.3, amplitude: 40, speed: 0.06, color: '#0F766E' },
          ]
        : [
            { y: 0.3, length: 0.5, amplitude: 50, speed: 0.03, color: '#38BDF8' },
            { y: 0.4, length: 0.7, amplitude: 30, speed: 0.045, color: '#0EA5E9' },
            { y: 0.5, length: 0.3, amplitude: 40, speed: 0.06, color: '#0284C7' },
          ];
    };

    const waves = getWaveColors();

    let animationFrameId: number;
    let time = 0;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background based on theme
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (theme === 'dark') {
        gradient.addColorStop(0, '#0f172a'); // Dark blue
        gradient.addColorStop(1, '#1e293b'); // Slightly lighter blue
      } else {
        gradient.addColorStop(0, '#f0f9ff'); // Light blue
        gradient.addColorStop(1, '#e0f2fe'); // Slightly darker light blue
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach(wave => {
        ctx.beginPath();
        
        // Draw each wave
        for (let x = 0; x <= canvas.width; x += 5) {
          const dx = x / canvas.width;
          const y = canvas.height * wave.y + 
                    Math.sin(dx * Math.PI * 2 / wave.length + time * wave.speed) * 
                    wave.amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the wave shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Fill with semi-transparent color
        ctx.fillStyle = wave.color + '80'; // Adding 80 for 50% opacity
        ctx.fill();
      });

      time += 0.1; // Increased from 0.05 to 0.1 for faster animation
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Correctly reference the theme variable

  // WhatsApp link with phone number
  const whatsappLink = "https://wa.me/584248443487";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Interactive wave background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-black/30 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20 md:py-0">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4 leading-tight">
            Soluciones Integrales en Conectividad y Seguridad
          </h1>
          <p className="text-lg md:text-xl text-white dark:text-white/90 mb-8">
            Expertos en instalación y configuración de redes, sistemas de seguridad y soluciones de audio para su hogar o negocio.
          </p>
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
            <Link 
              href="#servicios" 
              className="btn bg-white dark:bg-white text-primary dark:text-primary hover:bg-gray-100 dark:hover:bg-gray-100 text-center py-2 px-4 text-base w-auto inline-block"
            >
              Nuestros Servicios
            </Link>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn border-2 border-white dark:border-white text-white dark:text-white hover:bg-white dark:hover:bg-white hover:text-primary dark:hover:text-primary transition-all text-center flex items-center justify-center py-2 px-4 text-base w-auto"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;