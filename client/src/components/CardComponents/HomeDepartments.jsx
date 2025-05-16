// components/HomeDepartments.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsData } from '../../data/departmentsData';
import DepartmentCard from './DepartmentCard';

const HomeDepartments = () => {
  // Show only 10 departments on home page
  const featuredDepartments = departmentsData.slice(0, 10);

  return (
    <section className="w-full py-12 bg-[var(--color-accentlight)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">
            Our Departments
          </h2>
          <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto"></div>
          <p className="text-lg text-[var(--color-text-primary)] font-medium mt-4 opacity-90">
            Explore the range of medical specialties we offer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {featuredDepartments.map((department, index) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/departments"
            className="inline-block px-6 py-3 bg-[var(--color-secondary)] text-white rounded-lg hover:bg-[var(--color-primary)] transition-colors"
          >
            View All Departments
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeDepartments;