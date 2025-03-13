'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

// Define project categories
type ProjectCategory = 'all' | 'networks' | 'security' | 'audio' | 'integrated';

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  location: string;
  imageSrc: string;
  videoSrc?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Lazy load videos when they come into view
    if (videoRef.current && project.videoSrc) {
      const videoElement = videoRef.current;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && videoElement) {
              videoElement.load();
              videoElement.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Auto-play prevented:", e));
            } else if (videoElement) {
              videoElement.pause();
              setIsPlaying(false);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(videoElement);
      
      return () => {
        observer.unobserve(videoElement);
        videoElement.pause();
      };
    }
  }, [project.videoSrc]);

  // Effect to handle play/pause based on isPlaying state
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      if (isPlaying) {
        videoElement.play().catch(error => console.error('Error playing video:', error));
      } else {
        videoElement.pause();
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [isPlaying]);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden h-full flex flex-col`}>
      <div className="relative h-64 overflow-hidden">
        {project.videoSrc ? (
          <video 
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={project.imageSrc}
          >
            <source src={project.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>{project.title}</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4 text-justify text-sm leading-relaxed flex-grow`}>
          {project.description}
        </p>
        <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-auto`}>
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span>{project.location}</span>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { theme } = useTheme();
  
  // Projects data with new entries
  const projects: Project[] = [
    {
      id: 1,
      title: "Sistema de Audio para Istikbal",
      description: "Instalación de sistema de sonido ambiental, cámaras de seguridad y cableado estructurado (Data).",
      category: 'integrated',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      videoSrc: "/videos/projects/istikbal.webm"
    },
    {
      id: 2,
      title: "Sistema de Audio para Restaurante FatFit",
      description: "Instalación de sistema de sonido ambiental con control de volumen por zonas y conexión para eventos en vivo.",
      category: 'audio',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      videoSrc: "/videos/projects/fatfit.webm"
    },
    {
      id: 3,
      title: "Instalación Integral para Adidas",
      description: "Cableado estructurado (Data), instalación de cámaras IP, instalación de control de acceso y sistema de sonido ambientado por zona en Adidas C.C Sambil Chacao.",
      category: 'integrated',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      videoSrc: "/videos/projects/adidas.webm"
    },
    {
      id: 4,
      title: "Seguridad para Farmatodo",
      description: "Instalación de cámaras análogas en múltiples sedes de Farmatodo para garantizar la seguridad de clientes y empleados.",
      category: 'security',
      location: 'Margarita, Nueva Esparta',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      videoSrc: "/videos/projects/farmatodo.webm"
    },
    {
      id: 5,
      title: "Infraestructura para Supermercado Más x Menos",
      description: "Instalación de cableado estructurado, redes Wifi y cámaras IP en la sede del C.C Maracay Plaza.",
      category: 'networks',
      location: 'Maracay, Aragua',
      imageSrc: "/images/projects/masxmenos.jpg",
      videoSrc: "/videos/projects/masxmenos.webm"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Category buttons
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'integrated', label: 'Soluciones Integrales' },
    { id: 'networks', label: 'Redes' },
    { id: 'security', label: 'Seguridad' },
    { id: 'audio', label: 'Audio' }
  ];

  return (
    <section id="proyectos" className={`section ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Nuestros Proyectos</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto font-light text-lg`}>
            Conoce algunos de nuestros trabajos más destacados en instalación de redes, sistemas de seguridad y soluciones de audio.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ProjectCategory)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : theme === 'dark' 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects grid - single column on mobile, 3 on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 max-w-3xl mx-auto font-light text-lg`}>
            Estos son solo algunos ejemplos de nuestros proyectos. Contáctanos para conocer más sobre cómo podemos ayudarte con tus necesidades específicas.
          </p>
          <a href="#contacto" className="btn btn-primary uppercase font-bold tracking-wide">
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
