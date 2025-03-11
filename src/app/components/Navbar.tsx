'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              TechConnect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#servicios" className="text-dark hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="#proyectos" className="text-dark hover:text-primary transition-colors">
              Proyectos
            </Link>
            <Link href="#cobertura" className="text-dark hover:text-primary transition-colors">
              Cobertura
            </Link>
            <Link href="#contacto" className="btn btn-primary">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark focus:outline-none"
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
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="#servicios" className="text-dark hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Servicios
              </Link>
              <Link href="#proyectos" className="text-dark hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Proyectos
              </Link>
              <Link href="#cobertura" className="text-dark hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Cobertura
              </Link>
              <Link href="#contacto" className="btn btn-primary text-center" onClick={() => setIsOpen(false)}>
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