'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-black shadow-md ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button (Left) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex items-center md:justify-start justify-center flex-1 md:flex-none">
            <Link href="/" className="relative h-12 w-40">
              <Image 
                src="/images/logo_tecnocarlos.jpg" 
                alt="TecnoCarlosVe Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#servicios" className="relative text-white hover:text-primary transition-colors duration-300 py-2 group">
              <span className="relative z-10">Servicios</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#proyectos" className="relative text-white hover:text-primary transition-colors duration-300 py-2 group">
              <span className="relative z-10">Proyectos</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#cobertura" className="relative text-white hover:text-primary transition-colors duration-300 py-2 group">
              <span className="relative z-10">Cobertura</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#contacto" className="btn btn-primary hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              Contacto
            </Link>
          </div>

          {/* Empty div for spacing on mobile */}
          <div className="md:hidden w-6"></div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="#servicios" className="text-white hover:text-primary transition-colors py-2 border-b border-gray-800 flex justify-center items-center" onClick={() => setIsOpen(false)}>
                Servicios
              </Link>
              <Link href="#proyectos" className="text-white hover:text-primary transition-colors py-2 border-b border-gray-800 flex justify-center items-center" onClick={() => setIsOpen(false)}>
                Proyectos
              </Link>
              <Link href="#cobertura" className="text-white hover:text-primary transition-colors py-2 border-b border-gray-800 flex justify-center items-center" onClick={() => setIsOpen(false)}>
                Cobertura
              </Link>
              <Link href="#contacto" className="btn btn-primary text-center mt-2 transform hover:scale-105 transition-transform duration-300" onClick={() => setIsOpen(false)}>
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;