'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@/app/context/ThemeContext';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Location interface
interface Location {
  id: number;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  address: string;
  phone?: string;
  email?: string;
}

const Coverage = () => {
  const { theme } = useTheme();
  
  // Sample locations data
  const locations: Location[] = [
    {
      id: 1,
      name: "Porlamar, Nueva Esparta",
      description: "Oficina principal con servicios completos en toda la isla de Margarita",
      position: [10.9577, -63.8503],
      address: "6301, Porlamar 6301, Nueva Esparta, Venezuela",
      phone: "+58 424-8443487"
    },
    {
      id: 2,
      name: "Maracay, Aragua",
      description: "Cobertura en toda la ciudad y alrededores",
      position: [10.2469, -67.5958],
      address: "Maracay, Estado Aragua",
      phone: "+58 424-8443487"
    },
    {
      id: 3,
      name: "Caracas, Miranda",
      description: "Servicios en toda el área metropolitana",
      position: [10.4806, -66.9036],
      address: "Caracas, Distrito Capital",
      phone: "+58 424-8443487"
    },
    {
      id: 4,
      name: "Barquisimeto, Lara",
      description: "Servicios técnicos y de instalación en toda la ciudad",
      position: [10.0678, -69.3470],
      address: "Barquisimeto, Estado Lara",
      phone: "+58 424-8443487"
    }
  ];

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Default center position and zoom level
  const defaultCenter: [number, number] = [10.4806, -66.9036];
  const defaultZoom = 6;
  

  // Create a map component that only renders on client-side
  const Map = () => {
    if (!isMounted) return null;
    interface MapProps {
      center: [number, number];
      zoom: number;
      style: { height: string; width: string };
      scrollWheelZoom: boolean;
    }
    // Use type assertion if TypeScript still complains
    const mapProps: MapProps = {
      center: selectedLocation?.position || defaultCenter,
      zoom: selectedLocation ? 13 : defaultZoom,
      style: { height: "100%", width: "100%" },
      scrollWheelZoom: true
    };
    
    return (
      <MapContainer {...mapProps}>
        <TileLayer
          url={theme === 'dark' 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        {locations.map((location) => (
          <Marker 
            key={location.id} 
            position={location.position}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location);
              },
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-base">{location.name}</h3>
                <p className="text-sm text-justify">{location.description}</p>
                <p className="text-xs mt-1">{location.address}</p>
                <p className="text-xs mt-1">{location.phone}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };

  return (
    <section id="cobertura" className={`section ${theme === 'dark' ? 'bg-gray-900' : 'bg-secondary'} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Áreas de cobertura</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto font-light text-lg`}>
            Ofrecemos nuestros servicios en las siguientes localidades de Venezuela. Si tu ubicación no aparece, contáctanos para verificar disponibilidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Locations list */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Nuestras ubicaciones</h3>
            <div className="space-y-6">
              {locations.map((location) => (
                <div 
                  key={location.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedLocation?.id === location.id 
                      ? theme === 'dark' 
                        ? 'bg-primary/20 border-l-4 border-primary' 
                        : 'bg-primary/10 border-l-4 border-primary'
                      : theme === 'dark'
                        ? 'hover:bg-gray-600 border-l-4 border-transparent' 
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-primary mt-1 mr-3 text-xl"></i>
                    <div>
                      <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>{location.name}</h4>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2 text-sm text-justify leading-relaxed`}>{location.description}</p>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <p className="flex items-center mb-1">
                          <i className="fas fa-home mr-2"></i> {location.address}
                        </p>
                        <p className="flex items-center">
                          <i className="fas fa-phone mr-2"></i> {location.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
              <p className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} flex items-start`}>
                <i className="fas fa-info-circle text-primary mt-1 mr-2"></i>
                <span className="text-sm font-light">También ofrecemos servicios en otras localidades. Contáctanos para consultar disponibilidad en tu zona.</span>
              </p>
            </div>
          </div>
          
          {/* Map - Only render when client-side */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg relative">
            {!isMounted && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-primary animate-pulse mb-3"></div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Cargando mapa...</p>
                </div>
              </div>
            )}
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;