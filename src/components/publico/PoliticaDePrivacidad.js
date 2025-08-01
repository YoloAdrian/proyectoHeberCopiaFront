import React, { useState, useEffect } from 'react';
import { getAllPolices } from '../../api/admin';
import Breadcrumbs from '../Breadcrumbs';

export default function PoliticaDePrivacidad() {
  const [activePolicy, setActivePolicy] = useState(null);
  const breadcrumbPaths = [
    { name: 'Inicio', link: '/' },
    { name: 'Políticas De Privacidad', link: '/PoliticaDePrivacidad' },
  ];

  useEffect(() => {
    const fetchActivePolicy = async () => {
      try {
        const policies = await getAllPolices();
        const active = policies.find(policy => policy.estado === 'Activo');
        setActivePolicy(active);
      } catch (error) {
        console.error('Error al traer la política activa:', error);
      }
    };
    fetchActivePolicy();
  }, []);

  return (
    <div className="pt-20">
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="container mx-auto px-4 py-12">
        {activePolicy ? (
          <div className="max-w-6xl mx-auto">
            <h1 className="detalle-title text-4xl font-extrabold mb-8 text-center">
              {activePolicy.titulo || 'Política de Privacidad'}
            </h1>
            <div className="text-black dark:text-gray-300 text-lg whitespace-pre-line text-left">
              {activePolicy.descripcion}
            </div>
          </div>
        ) : (
          <p className="max-w-6xl mx-auto text-lg text-gray-700 dark:text-gray-300 text-left">
            No hay política activa en este momento.
          </p>
        )}
      </div>
    </div>
  );
}

