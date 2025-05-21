// pages/ServiceDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import * as FaIcons from 'react-icons/fa';

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const service = servicesData.find(
    srv => srv.name.toLowerCase().replace(/\s+/g, '-') === serviceName.toLowerCase()
  );

  if (!service) {
    return <div>Service not found</div>;
  }

  const IconComponent = FaIcons[service.icon];

  return (
    <div className="bg-[var(--color-accentlight)] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex justify-center items-center">
              <div className="text-[var(--color-primary)] text-6xl">
                {IconComponent && <IconComponent />}
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-[var(--color-text-primary)] mb-6">
                {service.description || "Comprehensive service for all your needs."}
              </p>
              <Link 
                to="/services" 
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium underline"
              >
                ← Back to Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;