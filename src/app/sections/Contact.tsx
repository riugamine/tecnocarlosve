'use client';

import { useTheme } from '@/app/context/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();

  return (
    <section id="contacto" className={`section ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Contáctanos</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto font-light text-lg`}>
            Estamos listos para ayudarte con tus necesidades de conectividad y seguridad. Contáctanos directamente a través de cualquiera de nuestros canales de comunicación.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Contact Information Card */}
          <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-secondary'} p-8 rounded-lg shadow-md`}>
            <h3 className={`text-xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : ''} text-center`}>Información de contacto</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>Teléfono</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>+58 424-8443487</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>Email</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>info@tecnocarlos.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>Ubicaciones</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-2`}>Porlamar, Isla de Margarita</p>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-2`}>Maracay, Estado Aragua</p>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-2`}>Caracas, Distrito Capital</p>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>Barquisimeto, Estado Lara</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>Horario de atención</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-2`}>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-white' : ''} text-center sm:text-left`}>Síguenos en redes sociales</h4>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <a 
                  href="https://www.facebook.com/share/1DM8FThPZT/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} w-12 h-12 flex items-center justify-center rounded-full text-primary hover:text-primary transition-colors`}
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a 
                  href="https://www.instagram.com/tecnocarlosve" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} w-12 h-12 flex items-center justify-center rounded-full text-primary hover:text-primary transition-colors`}
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a 
                  href="https://wa.me/584248443487" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} w-12 h-12 flex items-center justify-center rounded-full text-primary hover:text-primary transition-colors`}
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
            
            <div className={`mt-10 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-start">
                <div className="text-primary mr-4 text-2xl">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h5 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>Respuesta rápida</h5>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                    Para una atención más rápida, contáctanos directamente por WhatsApp o llámanos al número de teléfono indicado. 
                    Estamos comprometidos a responder a todas las consultas en el menor tiempo posible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;