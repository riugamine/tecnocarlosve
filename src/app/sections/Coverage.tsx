'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';

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
  phone: string;
  email: string;
}

const Coverage = () => {
  // Sample locations data
  const locations: Location[] = [
    {
      id: 1,
      name: "Porlamar, Nueva Esparta",
      description: "Oficina principal con servicios completos en toda la isla de Margarita",
      position: [10.9577, -63.8503],
      address: "Av. Santiago Mariño, C.C. Rattan Plaza, Local 5, Porlamar",
      phone: "+58 295 123 4567",
      email: "margarita@tecnocarlos.com"
    },
    {
      id: 2,
      name: "Maracay, Aragua",
      description: "Cobertura en toda la ciudad y alrededores",
      position: [10.2469, -67.5958],
      address: "Av. Las Delicias, Centro Comercial Las Américas, Local 12, Maracay",
      phone: "+58 243 987 6543",
      email: "maracay@tecnocarlos.com"
    },
    {
      id: 3,
      name: "Caracas, Miranda",
      description: "Servicios en toda el área metropolitana",
      position: [10.4806, -66.9036],
      address: "Av. Francisco de Miranda, Torre Europa, Piso 5, Oficina 5-B, Caracas",
      phone: "+58 212 456 7890",
      email: "caracas@tecnocarlos.com"
    }
  ];

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Default center position and zoom level
  const defaultCenter: [number, number] = [10.4806, -66.9036];
  const defaultZoom = 6;
  
  // Fix for Leaflet icon issue and handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      // This is needed to fix the marker icon issue with Leaflet in React
      const L = require('leaflet');
      
      // Fix the icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  // Create a map component that only renders on client-side
  const Map = () => {
    if (!isMounted) return null;
    
    return (
      <MapContainer 
        center={selectedLocation?.position || defaultCenter}
        zoom={selectedLocation ? 13 : defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                <h3 className="font-medium text-base">{location.name}</h3>
                <p className="text-sm">{location.description}</p>
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
    <section id="cobertura" className="section bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Áreas de Cobertura</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos nuestros servicios en las siguientes localidades de Venezuela. Si tu ubicación no aparece, contáctanos para verificar disponibilidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Locations list */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Nuestras Ubicaciones</h3>
            <div className="space-y-6">
              {locations.map((location) => (
                <div 
                  key={location.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedLocation?.id === location.id 
                      ? 'bg-primary/10 border-l-4 border-primary' 
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-primary mt-1 mr-3 text-xl"></i>
                    <div>
                      <h4 className="font-medium text-lg">{location.name}</h4>
                      <p className="text-gray-600 mb-2">{location.description}</p>
                      <div className="text-sm text-gray-500">
                        <p className="flex items-center mb-1">
                          <i className="fas fa-home mr-2"></i> {location.address}
                        </p>
                        <p className="flex items-center mb-1">
                          <i className="fas fa-phone mr-2"></i> {location.phone}
                        </p>
                        <p className="flex items-center">
                          <i className="fas fa-envelope mr-2"></i> {location.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 flex items-start">
                <i className="fas fa-info-circle text-primary mt-1 mr-2"></i>
                <span>También ofrecemos servicios en otras localidades. Contáctanos para consultar disponibilidad en tu zona.</span>
              </p>
            </div>
          </div>
          
          {/* Map - Only render when client-side */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;