// import React from 'react';
// import { 
//   FaAmbulance, FaBed, FaXRay, FaTint, FaFlask, 
//   FaPills, FaProcedures, FaChild, FaUserMd, 
//   FaHome, FaBrain, FaComments, FaDna, 
//   FaHandsHelping, FaMoneyBillWave, FaClipboardList, FaUsers,
//   FaHeartbeat, FaTeeth, FaEye, FaSyringe
// } from 'react-icons/fa';

// const Services = () => {
//   const serviceCategories = [
//     {
//       title: "Hospital Services",
//       icon: <FaBed size={30} />,
//       services: [
//         { name: "Emergency Room Services", icon: <FaAmbulance /> },
//         { name: "Short Term Hospitalisation", icon: <FaBed /> },
//         { name: "X-Ray OR Radiology Services", icon: <FaXRay /> },
//         { name: "Blood Services", icon: <FaTint /> },
//         { name: "Laboratory Services", icon: <FaFlask /> },
//         { name: "Prescription Services", icon: <FaPills /> },
//         { name: "General & Speciality Surgical Services", icon: <FaProcedures /> },
//         { name: "Pediatric Services", icon: <FaChild /> },
//         { name: "Good Access to Surgical Specialist", icon: <FaUserMd /> },
//         { name: "Rehabitations Services", icon: <FaProcedures /> },
//         { name: "Home Nursing Services", icon: <FaHome /> },
//         { name: "Mental HealthCare", icon: <FaBrain /> }
//       ]
//     },
//     {
//       title: "Clinical Services",
//       icon: <FaHeartbeat size={30} />,
//       services: [
//         { name: "National Counseling", icon: <FaComments /> },
//         { name: "Genetic Testing & Counseling", icon: <FaDna /> },
//         { name: "Family Support Services", icon: <FaHandsHelping /> },
//         { name: "Financial Services", icon: <FaMoneyBillWave /> },
//         { name: "Case Management Services", icon: <FaClipboardList /> },
//         { name: "Social Work Services", icon: <FaUsers /> }
//       ]
//     },
//     {
//       title: "Diagnostics Services",
//       icon: <FaXRay size={30} />,
//       services: [
//         { name: "Blood Test", icon: <FaTint /> },
//         { name: "Urine Test", icon: <FaFlask /> },
//         { name: "Stool Test", icon: <FaFlask /> },
//         { name: "X-Ray", icon: <FaXRay /> },
//         { name: "CT Scan", icon: <FaXRay /> },
//         { name: "MRI", icon: <FaXRay /> },
//         { name: "ECG", icon: <FaHeartbeat /> }
//       ]
//     },
//     {
//       title: "Hospital Functions",
//       icon: <FaProcedures size={30} />,
//       services: [
//         { name: "Emergency Room Services", icon: <FaAmbulance /> },
//         { name: "ICU", icon: <FaHeartbeat /> },
//         { name: "OT", icon: <FaProcedures /> },
//         { name: "Ward", icon: <FaBed /> },
//         { name: "OPD", icon: <FaUserMd /> }
//       ]
//     },
//     {
//       title: "Bed Types",
//       icon: <FaBed size={30} />,
//       services: [
//         { name: "General Bed", icon: <FaBed /> },
//         { name: "Semi Private Bed", icon: <FaBed /> },
//         { name: "Private Bed", icon: <FaBed /> },
//         { name: "ICU Bed", icon: <FaHeartbeat /> },
//         { name: "OT Bed", icon: <FaProcedures /> }
//       ]
//     }
//   ];

//   return (
//     <div className="bg-[var(--color-background)]">
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h1>
//           <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto">
//             Explore our wide range of medical services designed to meet all your healthcare needs
//           </p>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {serviceCategories.map((category, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--color-accent)] hover:shadow-xl transition-shadow duration-300">
//                 <div className="p-6">
//                   <div className="flex items-center mb-4">
//                     <div className="text-[var(--color-primary)] mr-4">
//                       {category.icon}
//                     </div>
//                     <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{category.title}</h3>
//                   </div>
//                   <ul className="space-y-3">
//                     {category.services.map((service, i) => (
//                       <li key={i} className="flex items-start">
//                         <span className="text-[var(--color-primary)] mr-3 mt-1">{service.icon}</span>
//                         <span className="text-[var(--color-text-primary)]">{service.name}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Need Help Finding a Service?</h2>
//           <p className="text-xl max-w-2xl mx-auto mb-8">
//             Our patient care coordinators are available to guide you
//           </p>
//           <button className="bg-white text-[var(--color-primary)] hover:bg-[var(--color-accentlight)] hover:text-[var(--color-secondary)] font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
//             Contact Our Team
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Services;

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