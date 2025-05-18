// components/HomeDepartments.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsData } from '../../data/departmentsData';
import DepartmentCard from './DepartmentCard';

const HomeDepartments = () => {
  const featuredDepartments = departmentsData.slice(0, 5);

  return (
    <section className="w-full md:pt-32 pb-8 md:pb-12 bg-accentlight">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3 md:mb-4">
            Our Departments
          </h2>
          <div className="w-16 md:w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-base md:text-lg text-textPrimary font-medium mt-3 md:mt-4 opacity-90">
            Explore the range of medical specialties we offer
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 md:gap-6">
          {featuredDepartments.map((department, index) => (
            <div key={index} className="w-full max-w-xs sm:max-w-none">
              <DepartmentCard department={department} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/departments"
            className="inline-block px-4 py-2 md:px-6 md:py-3 bg-secondary text-white rounded-lg hover:bg-primary transition-colors text-sm md:text-base"
          >
            View All Departments
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeDepartments;