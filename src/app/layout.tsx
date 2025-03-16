import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';

// Font configuration
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Add viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'TecnoCarlosVe - Soluciones de Conectividad y Seguridad',
  description: 'Expertos en instalación y configuración de redes, sistemas de seguridad y soluciones de audio para su hogar o negocio en Venezuela.',
  keywords: 'redes, seguridad, cámaras, audio, instalación, Venezuela, Margarita, Caracas, Maracay, Barquisimeto',
  authors: [{ name: 'TecnoCarlos' }],
  creator: 'TecnoCarlos',
  publisher: 'TecnoCarlos',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://tecnocarlos.com',
    siteName: 'TecnoCarlosVe',
    title: 'TecnoCarlosVe - Soluciones Integrales en Conectividad y Seguridad',
    description: 'Expertos en instalación de redes, sistemas de seguridad y soluciones de audio para hogares y empresas en Venezuela.',
    images: [
      {
        url: 'https://res.cloudinary.com/da95ksabl/image/upload/c_fill,g_center,h_1200,w_630/v1742133307/og-image_djaw72.jpg',
        width: 630,
        height: 1200,
        alt: 'TecnoCarlosVe - Servicios de Conectividad y Seguridad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TecnoCarlosVe - Soluciones en Conectividad y Seguridad',
    description: 'Servicios profesionales de instalación de redes, sistemas de seguridad y audio en Venezuela.',
    images: ['https://res.cloudinary.com/da95ksabl/image/upload/v1742133307/og-image_djaw72.jpg'],
  },
  alternates: {
    canonical: 'https://tecnocarlos.com',
  },
  category: 'technology',
  // Remove viewport from here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${montserrat.variable} font-sans`}>
        <ThemeProviderWrapper>
          <Navbar />
          {children}
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}