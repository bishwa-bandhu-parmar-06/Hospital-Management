// pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData, serviceCategories } from '../data/servicesData';
import * as FaIcons from 'react-icons/fa';
import ServiceCard from '../components/CardComponents/ServiceCard';
const Services = () => {
  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h1>
          <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Explore our wide range of medical services designed to meet all your healthcare needs
          </p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {serviceCategories.map((category, index) => {
            const CategoryIcon = FaIcons[category.icon];
            return (
              <div key={index} className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="text-[var(--color-primary)] mr-4">
                    {CategoryIcon && <CategoryIcon size={30} />}
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-secondary)]">
                    {category.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, i) => {
                    const serviceDetail = servicesData.find(s => s.name === service.name);
                    return serviceDetail ? (
                      <ServiceCard key={i} service={serviceDetail} />
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Finding a Service?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Our patient care coordinators are available to guide you
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-[var(--color-primary)] hover:bg-[var(--color-accentlight)] hover:text-[var(--color-secondary)] font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;