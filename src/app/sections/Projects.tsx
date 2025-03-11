'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

// Define project categories
type ProjectCategory = 'all' | 'networks' | 'security' | 'audio';

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  location: string;
  images: {
    original: string;
    thumbnail: string;
  }[];
}

const Projects = () => {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  // Sample projects data - replace with actual projects later
  const projects: Project[] = [
    {
      id: 1,
      title: "Cableado Estructurado para Oficina Corporativa",
      description: "Instalación completa de red con más de 50 puntos de conexión, switches administrables y sistema de respaldo UPS.",
      category: 'networks',
      location: 'Caracas, Miranda',
      images: [
        {
          original: '/images/projects/network-1.jpg',
          thumbnail: '/images/projects/network-1-thumb.jpg',
        },
        {
          original: '/images/projects/network-2.jpg',
          thumbnail: '/images/projects/network-2-thumb.jpg',
        }
      ]
    },
    {
      id: 2,
      title: "Sistema de Seguridad para Centro Comercial",
      description: "Instalación de 24 cámaras IP con monitoreo remoto, grabación continua y detección de movimiento.",
      category: 'security',
      location: 'Porlamar, Nueva Esparta',
      images: [
        {
          original: '/images/projects/security-1.jpg',
          thumbnail: '/images/projects/security-1-thumb.jpg',
        },
        {
          original: '/images/projects/security-2.jpg',
          thumbnail: '/images/projects/security-2-thumb.jpg',
        }
      ]
    },
    {
      id: 3,
      title: "Sistema de Audio para Restaurante",
      description: "Instalación de sistema de sonido ambiental con control de volumen por zonas y conexión para eventos en vivo.",
      category: 'audio',
      location: 'Maracay, Aragua',
      images: [
        {
          original: '/images/projects/audio-1.jpg',
          thumbnail: '/images/projects/audio-1-thumb.jpg',
        },
        {
          original: '/images/projects/audio-2.jpg',
          thumbnail: '/images/projects/audio-2-thumb.jpg',
        }
      ]
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Category buttons
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'networks', label: 'Redes' },
    { id: 'security', label: 'Seguridad' },
    { id: 'audio', label: 'Audio' }
  ];

  return (
    <section id="proyectos" className="section bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Proyectos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={project.images[0].original}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{project.location}</span>
                </div>
                {/* Modal trigger could be added here for a detailed view */}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Estos son solo algunos ejemplos de nuestros proyectos. Contáctanos para conocer más sobre cómo podemos ayudarte con tus necesidades específicas.
          </p>
          <a href="#contacto" className="btn btn-primary">
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;