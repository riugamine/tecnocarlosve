'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

// Skeleton component for video loading
const VideoSkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`absolute inset-0 z-10 flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
    }`}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-primary animate-pulse mb-3"></div>
        <p className={`text-sm font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Cargando video...
        </p>
      </div>
    </div>
  );
};

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Reset loading state when category changes
  useEffect(() => {
    setIsLoading(true);
    setIsVideoLoaded(false);
    setShouldLoadVideo(false);
  }, [activeCategory]);

  // Lazy loading: only load video when wrapper comes into view
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !project.cloudinaryVideoId) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );
    observer.observe(wrapper);
    return () => {
      observer.disconnect();
    };
  }, [project.cloudinaryVideoId, activeCategory]);

  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  // Handle video error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error for:", project.title, e);
    setIsLoading(false);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden h-full flex flex-col`}>
      <div ref={wrapperRef} className="relative h-64 overflow-hidden">
        {/* Show skeleton while loading */}
        {project.cloudinaryVideoId && shouldLoadVideo && isLoading && <VideoSkeleton />}
        
        {/* Show poster image initially */}
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            project.cloudinaryVideoId && isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          loading="lazy"
        />
        
        {/* Lazy load video only when in view */}
        {project.cloudinaryVideoId && shouldLoadVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={project.imageSrc}
            onLoadedMetadata={handleVideoLoaded}
            onError={handleVideoError}
            key={`video-${project.id}-${activeCategory}-${shouldLoadVideo ? 'load' : 'wait'}`}
          >
            <source src={project.cloudinaryVideoId} type="video/mp4" />
            <source src={project.cloudinaryVideoId.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Rest of the component remains the same */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>{project.title}</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm leading-relaxed flex-grow`}>
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
    },
    {
      id: 6,
      title: "Instalación integral para Calvin Klein",
      description: "Cableado estructurado (Data), instalación de cámaras análogas y sistema de sonido ambiental en tienda Calvin Klein C.C Los Aviadores.",
      category: 'integrated',
      location: 'Maracay, Aragua',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1751750396/Maracay_C.C_Los_Aviadores_Tiendas_Calvin_Klein_i5falb.mp4"
    },
    {
      id: 7,
      title: "Instalación integral para Clark",
      description: "Cableado estructurado (Data), instalación de cámaras análogas y sistema de sonido ambiental en tienda Clark C.C Los Aviadores.",
      category: 'integrated',
      location: 'Maracay, Aragua',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1751750395/Maracay_C.C_Los_Aviadores_Tiendas_Clark_twnd5d.mp4"
    },
    {
      id: 8,
      title: "Instalación integral para The Children's Place",
      description: "Cableado estructurado (Data), instalación de cámaras análogas y sistema de sonido ambiental en tienda The Children's Place C.C Los Aviadores.",
      category: 'integrated',
      location: 'Maracay, Aragua',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1751750394/Maracay_C.C_Los_Aviadores_Tiendas_The_Children_Place_mbkibx.mp4"
    },
    {
      id: 9,
      title: "Instalación integral para Samsonite",
      description: "Cableado estructurado (Data), instalación de cámaras análogas y sistema de sonido ambiental en tienda Samsonite C.C Sambil Barquisimeto.",
      category: 'integrated',
      location: 'Barquisimeto, Lara',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1751751395/Barquisimeto_C.C_Sambil_Tienda_Samsonite_ag6lvw.mp4"
    },
    {
      id: 10,
      title: "Instalación integral para American Eagle",
      description: "Cableado estructurado (Data), instalación de cámaras análogas y sistema de sonido ambiental en tienda American Eagle C.C Sambil Barquisimeto.",
      category: 'integrated',
      location: 'Barquisimeto, Lara',
      imageSrc: "/images/projects/tecnocarlosve.jpg",
      cloudinaryVideoId: "https://res.cloudinary.com/da95ksabl/video/upload/v1751751394/Barquisimeto_C.C_Sambil_Tienda_American_Eagle_bjtvmi.mp4"
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
