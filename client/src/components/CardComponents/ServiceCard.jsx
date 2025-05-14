// components/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  const IconComponent = FaIcons[service.icon];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-center mb-4 text-[var(--color-primary)]">
          {IconComponent && <IconComponent size={40} />}
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-secondary)] text-center mb-2">
          {service.name}
        </h3>
        <p className="text-[var(--color-text-primary)] text-sm line-clamp-2 mb-4">
          {service.description}
        </p>
        <Link
          to={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="block w-full text-center py-2 px-4 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;