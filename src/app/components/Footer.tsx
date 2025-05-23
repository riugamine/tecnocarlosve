'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">TecnoCarlos</h3>
            <p className="text-gray-300 mb-4">
              Soluciones integrales en conectividad y seguridad para hogares y empresas en Venezuela.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/share/1DM8FThPZT/?mibextid=wwXIfr" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/tecnocarlosve" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/584248443487" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#proyectos" className="text-gray-300 hover:text-white transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="#cobertura" className="text-gray-300 hover:text-white transition-colors">
                  Cobertura
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  Redes y cableado estructurado
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  Sistemas de seguridad
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  Instalación de sonido
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
                  Soporte técnico
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span>6301, Porlamar 6301, Nueva Esparta, Venezuela</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-phone mt-1 mr-3 text-primary"></i>
                <span>+58 424 84 43 487</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-envelope mt-1 mr-3 text-primary"></i>
                <span>info@tecnocarlos.com</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <i className="fas fa-clock mt-1 mr-3 text-primary"></i>
                <span>Lun - Vie: 8:00 AM - 6:00 PM<br />Sáb: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-dark border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 text-sm text-center">
              &copy; {currentYear} TecnoCarlos. Todos los derechos reservados.
            </p>
            <a 
              href="https://www.instagram.com/joseangelweb_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Powered by @joseangelweb_
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;