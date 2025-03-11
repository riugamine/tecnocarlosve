'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg" // You'll need to add this image to your public/images folder
          alt="Servicios de cableado estructurado y seguridad"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20 md:py-0">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Soluciones Integrales en Conectividad y Seguridad
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Expertos en instalación y configuración de redes, sistemas de seguridad y soluciones de audio para su hogar o negocio.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="#servicios" 
              className="btn bg-white text-primary hover:bg-gray-100 text-center"
            >
              Nuestros Servicios
            </Link>
            <Link 
              href="#contacto" 
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary transition-all text-center"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;