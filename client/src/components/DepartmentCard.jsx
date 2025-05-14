// components/DepartmentCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  return (
    <div className=" w-72 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <img 
            src={department.image} 
            alt={department.name}
            className="w-20 h-20 object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-secondary)] text-center mb-2">
          {department.name}
        </h3>
        <div className="flex justify-between text-sm text-[var(--color-text-primary)] mb-3">
          <span>{department.doctors} Doctors</span>
          <span>{department.hospitals} Hospitals</span>
        </div>
        <p className="text-[var(--color-text-primary)] text-sm line-clamp-2 mb-4">
          {department.description}
        </p>
        <Link
          to={`/departments/${department.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="block w-full text-center py-2 px-4 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;