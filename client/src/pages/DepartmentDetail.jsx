// pages/DepartmentDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';

const DepartmentDetail = () => {
  const { departmentName } = useParams();
  const department = departmentsData.find(
    dept => dept.name.toLowerCase().replace(/\s+/g, '-') === departmentName.toLowerCase()
  );

  if (!department) {
    return <div>Department not found</div>;
  }

  return (
    <div className="bg-[var(--color-background)] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex justify-center">
              <img 
                src={department.image} 
                alt={department.name}
                className="w-64 h-64 object-contain rounded-full border-4 border-[var(--color-accent)]"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">
                {department.name}
              </h1>
              <div className="flex gap-8 my-6">
                <div className="bg-[var(--color-accentlight)] p-4 rounded-lg">
                  <p className="text-sm text-[var(--color-text-primary)] opacity-80">Doctors</p>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {department.doctors}
                  </p>
                </div>
                <div className="bg-[var(--color-accentlight)] p-4 rounded-lg">
                  <p className="text-sm text-[var(--color-text-primary)] opacity-80">Hospitals</p>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {department.hospitals}
                  </p>
                </div>
              </div>
              <p className="text-lg text-[var(--color-text-primary)] mb-6">
                {department.description || "Comprehensive care for all your needs in this specialty."}
              </p>
              <Link 
                to="/departments" 
                className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium underline"
              >
                ← Back to Departments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;