'use client';

import { FC, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, description, imageSrc, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Lazy load videos when they come into view
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && videoRef.current) {
              videoRef.current.load();
              videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(videoRef.current);
      
      return () => {
        if (videoRef.current) observer.unobserve(videoRef.current);
      };
    }
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2`}>
      {videoSrc ? (
        <div className="relative h-48 overflow-hidden">
          <video 
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : imageSrc ? (
        <div className="relative h-48">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="text-primary text-4xl mb-4">
          <i className={icon}></i>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-justify text-sm leading-relaxed`}>{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const { theme } = useTheme();
  
  const services = [
    {
      icon: "fas fa-network-wired",
      title: "Redes y Cableado Estructurado",
      description: "Instalamos y configuramos todo tipo de redes para tu hogar o negocio. Desde routers y switches hasta puntos de acceso Wi-Fi para una conexión estable y segura en todos tus dispositivos.",
      imageSrc: "/images/services/networking.jpg",
      videoSrc: "/videos/services/networking.mp4"
    },
    {
      icon: "fas fa-video",
      title: "Sistemas de Seguridad",
      description: "Protege lo que más valoras con nuestras soluciones de videovigilancia. Instalamos cámaras analógicas e IP con monitoreo remoto desde tu celular para que puedas ver lo que sucede en tiempo real.",
      imageSrc: "/images/services/security.jpg",
      videoSrc: "/videos/services/security.mp4" // Agrega la ruta a tu video
    },
    {
      icon: "fas fa-volume-up",
      title: "Instalación de Sonido",
      description: "Creamos ambientes sonoros perfectos con sistemas de audio de alta calidad. Instalamos amplificadores, altavoces y controles de volumen para cada espacio de tu hogar o negocio.",
      imageSrc: "/images/services/audio.jpg",
      videoSrc: "/videos/services/audio.mp4" // Agrega la ruta a tu video
    },
    {
      icon: "fas fa-tools",
      title: "Soporte Técnico",
      description: "Ofrecemos asistencia técnica para todos nuestros servicios. Nuestro equipo está disponible para resolver cualquier problema que puedas tener con tus sistemas de conectividad o seguridad.",
      imageSrc: "/images/services/support.jpg"
      // Este servicio no tiene video
    }
  ];

  return (
    <section id="servicios" className={`section ${theme === 'dark' ? 'bg-gray-900' : 'bg-secondary'} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Nuestros Servicios</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto font-light text-lg`}>
            Ofrecemos soluciones integrales adaptadas a tus necesidades, con tecnología de punta y personal calificado para garantizar la mejor experiencia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              videoSrc={service.videoSrc}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 max-w-3xl mx-auto font-light text-lg`}>
            Todos nuestros servicios están diseñados pensando en la facilidad de uso y la confiabilidad. 
            Utilizamos equipos de calidad y las mejores prácticas para garantizar instalaciones duraderas y eficientes.
          </p>
          <a href="#contacto" className="btn btn-primary uppercase font-bold tracking-wide">
            Solicitar Presupuesto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;