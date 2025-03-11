'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

// Contact form validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Por favor ingresa tu nombre'),
  email: Yup.string().email('Email inválido').required('Por favor ingresa tu email'),
  phone: Yup.string().required('Por favor ingresa tu teléfono'),
  service: Yup.string().required('Por favor selecciona un servicio'),
  message: Yup.string().required('Por favor ingresa tu mensaje')
});

// Initial form values
const initialValues = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
};

const Contact = () => {
  // Form submission status
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    try {
      // In a real implementation, you would send the form data to your backend or email service
      // For example, using EmailJS or a custom API endpoint
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success response
      setFormStatus({
        submitted: true,
        success: true,
        message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
      });
      
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      // Error handling
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos listos para ayudarte con tus necesidades de conectividad y seguridad. Completa el formulario y nos pondremos en contacto contigo a la brevedad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-secondary p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Teléfono</h4>
                  <p className="text-gray-600">+58 123 456 7890</p>
                  <p className="text-gray-600">+58 987 654 3210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4">
                  <i className="fas fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-gray-600">info@tecnocarlos.com</p>
                  <p className="text-gray-600">ventas@tecnocarlos.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 text-white mr-4">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Oficina Principal</h4>
                  <p className="text-gray-600">Av. Santiago Mariño, C.C. Rattan Plaza, Local 5</p>
                  <p className="text-gray-600">Porlamar, Isla de Margarita, Venezuela</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-lg mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Envíanos un Mensaje</h3>
            
            {formStatus.submitted && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  formStatus.success 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {formStatus.message}
              </div>
            )}
            
            <Formik
              initialValues={initialValues}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Nombre</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Teléfono</label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+58 123 456 7890"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="service" className="block text-gray-700 mb-2">Servicio de Interés</label>
                    <Field
                      as="select"
                      name="service"
                      id="service"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="redes">Redes y Cableado Estructurado</option>
                      <option value="seguridad">Sistemas de Seguridad</option>
                      <option value="audio">Instalación de Sonido</option>
                      <option value="soporte">Soporte Técnico</option>
                      <option value="otro">Otro</option>
                    </Field>
                    <ErrorMessage name="service" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Mensaje</label>
                    <Field
                      as="textarea"
                      name="message"
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;