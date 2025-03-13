'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';
import { CldVideoPlayer } from 'next-cloudinary';

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
  cloudinaryVideoId?: string; // New field for Cloudinary video ID
}

interface ProjectCardProps {
  project: Project;
  activeCategory: ProjectCategory; // Add this prop
}

const ProjectCard = ({ project, activeCategory }: ProjectCardProps) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<string>(`video-${project.id}`);

  // Reset loading state when category changes
  useEffect(() => {
    setIsLoading(true);
    setIsVideoLoaded(false);
  }, [activeCategory]);

  // Add this new effect to handle progressive loading
  useEffect(() => {
    if (project.cloudinaryVideoId) {
      // Set a timeout to start showing the video even if not fully loaded
      const progressiveLoadTimer = setTimeout(() => {
        setIsVideoLoaded(true);
        setIsLoading(false);
      }, 1000); // Show after 1 second regardless of load state
      
      return () => clearTimeout(progressiveLoadTimer);
    }
  }, [project.cloudinaryVideoId, activeCategory]);

  useEffect(() => {
    // Lazy load videos when they come into view
    if (videoRef.current && project.videoSrc && !project.cloudinaryVideoId) {
      const videoElement = videoRef.current;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              videoElement.load();
              videoElement.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Auto-play prevented:", e));
            } else {
              setIsVisible(false);
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
  }, [project.videoSrc, project.cloudinaryVideoId]);

  // Handle video load event
  const handleVideoLoaded = () => {
    // Start showing the video as soon as metadata is loaded
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  // Handle video error
  const handleVideoError = (e: any) => {
    console.error("Video error for:", project.title, e);
    setIsLoading(false);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden h-full flex flex-col`}>
      <div className="relative h-64 overflow-hidden">
        {/* Simplified loading indicator - only pulsing circle */}
        {project.cloudinaryVideoId && isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-800">
            <div className="flex flex-col items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-primary animate-pulse mb-3"></div>
              <p className="text-white text-sm font-medium">Cargando video...</p>
            </div>
          </div>
        )}
        
        {project.cloudinaryVideoId ? (
          // Use regular video tag with cloudinary URL
          <video 
            id={playerRef.current}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={project.imageSrc}
            onLoadedMetadata={handleVideoLoaded}
            onError={handleVideoError}
            key={`video-${project.id}-${activeCategory}-${isVideoLoaded ? 'loaded' : 'loading'}`}
          >
            <source src={project.cloudinaryVideoId} type="video/webm" />
            <source src={project.cloudinaryVideoId.replace('.webm', '.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : project.videoSrc ? (
          // Fallback to regular video if no cloudinaryVideoId but videoSrc exists
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
          // Use Image as fallback
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
          />
        )}
      </div>
      
      {/* Rest of the component remains the same */}
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
  
  // Projects data with Cloudinary video IDs
  const projects: Project[] = [
    {
      id: 1,
      title: "Sistema de audio para Istikbal",
      description: "Instalación de sistema de sonido ambiental, cámaras de seguridad y cableado estructurado (Data).",
      category: 'integrated',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1741887137/Istikbal_zygdtw.webm"
    },
    {
      id: 2,
      title: "Sistema de audio para restaurante FatFit",
      description: "Instalación de sistema de sonido ambiental con control de volumen por zonas y conexión para eventos en vivo.",
      category: 'audio',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1741887136/Fatfit_a0ranp.webm"
    },
    {
      id: 3,
      title: "Instalación integral para Adidas",
      description: "Cableado estructurado (Data), instalación de cámaras IP, instalación de control de acceso y sistema de sonido ambientado por zona en Adidas C.C Sambil Chacao.",
      category: 'integrated',
      location: 'Caracas, Distrito Capital',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1741887136/Adidas_eocfpb.webm"
    },
    {
      id: 4,
      title: "Seguridad para Farmatodo",
      description: "Instalación de cámaras análogas en múltiples sedes de Farmatodo para garantizar la seguridad de clientes y empleados.",
      category: 'security',
      location: 'Margarita, Nueva Esparta',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1741887136/Farmatodo_zzrtli.webm"
    },
    {
      id: 5,
      title: "Infraestructura para supermercado Más x Menos",
      description: "Instalación de cableado estructurado, redes Wifi y cámaras IP en la sede del C.C Maracay Plaza.",
      category: 'networks',
      location: 'Maracay, Aragua',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1741887136/Masxmenos_udfw6c.webm"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Category buttons
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'integrated', label: 'Soluciones integrales' },
    { id: 'networks', label: 'Redes' },
    { id: 'security', label: 'Seguridad' },
    { id: 'audio', label: 'Audio' }
  ];

  return (
    <section id="proyectos" className={`section ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Nuestros proyectos</h2>
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
            <ProjectCard 
              key={`${project.id}-${activeCategory}`} 
              project={project} 
              activeCategory={activeCategory}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6 max-w-3xl mx-auto font-light text-lg`}>
            Estos son solo algunos ejemplos de nuestros proyectos. Contáctanos para conocer más sobre cómo podemos ayudarte con tus necesidades específicas.
          </p>
          <a href="#contacto" className="btn btn-primary uppercase font-light tracking-wide">
            SOLICITAR INFORMACIÓN
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
