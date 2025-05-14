// import React from 'react';
// import { 
//   FaBone, FaHeartbeat, FaBrain, FaLungs, 
//   FaTooth, FaEye, FaChild, FaFemale,
//   FaProcedures, FaUserMd, FaClinicMedical,
//   FaHospital, FaMedkit, FaWheelchair, FaUserNurse
// } from 'react-icons/fa';

// const Departments = () => {
//   const departments = [
//     {
//       name: "Orthopaedics",
//       icon: <FaBone size={40} />,
//       description: "Specialized care for musculoskeletal system including bones, joints, and muscles."
//     },
//     {
//       name: "Cardiology",
//       icon: <FaHeartbeat size={40} />,
//       description: "Comprehensive heart care including diagnostics and treatment."
//     },
//     {
//       name: "Neurology",
//       icon: <FaBrain size={40} />,
//       description: "Specialized care for disorders of the nervous system."
//     },
//     {
//       name: "Pulmonology",
//       icon: <FaLungs size={40} />,
//       description: "Expert care for respiratory system and lung conditions."
//     },
//     {
//       name: "Gastroenterology",
//       icon: <FaMedkit size={40} />, // Alternative for stomach
//       description: "Diagnosis and treatment of digestive system disorders."
//     },
//     {
//       name: "Dentistry",
//       icon: <FaTooth size={40} />,
//       description: "Complete oral health services for patients of all ages."
//     },
//     {
//       name: "Ophthalmology",
//       icon: <FaEye size={40} />,
//       description: "Vision care and treatment for eye diseases and disorders."
//     },
//     {
//       name: "Pediatrics",
//       icon: <FaChild size={40} />,
//       description: "Specialized medical care for infants, children, and adolescents."
//     },
//     {
//       name: "Gynecology",
//       icon: <FaFemale size={40} />,
//       description: "Women's health services including reproductive system care."
//     },
//     {
//       name: "General Surgery",
//       icon: <FaProcedures size={40} />,
//       description: "Surgical treatment for a wide range of medical conditions."
//     },
//     {
//       name: "ENT",
//       icon: <FaUserMd size={40} />,
//       description: "Care for ear, nose, and throat conditions."
//     },
//     {
//       name: "ICU",
//       icon: <FaClinicMedical size={40} />,
//       description: "Critical care for patients with life-threatening conditions."
//     },
//     {
//       name: "Trauma",
//       icon: <FaHospital size={40} />,
//       description: "Emergency care for traumatic injuries."
//     },
//     {
//       name: "Nephrology",
//       icon: <FaUserNurse size={40} />, // Alternative for kidney
//       description: "Specialized care for kidney diseases and disorders."
//     },
//     {
//       name: "Oncology",
//       icon: <FaMedkit size={40} />,
//       description: "Comprehensive cancer diagnosis and treatment."
//     },
//     {
//       name: "Rheumatology",
//       icon: <FaWheelchair size={40} />,
//       description: "Care for arthritis and other joint disorders."
//     }
//   ];

//   return (
//     <div className="bg-[var(--color-background)]">
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Medical Departments</h1>
//           <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto">
//             Specialized care across a comprehensive range of medical disciplines
//           </p>
//         </div>
//       </section>

//       {/* Departments Grid */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {departments.map((dept, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-[var(--color-accent)] hover:shadow-lg transition-shadow duration-300 text-center">
//                 <div className="text-[var(--color-primary)] mb-4 flex justify-center">
//                   {dept.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">{dept.name}</h3>
//                 <p className="text-sm text-[var(--color-text-primary)] opacity-80">{dept.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Need Help Choosing a Department?</h2>
//           <p className="text-xl max-w-2xl mx-auto mb-8">
//             Our care coordinators can help you find the right specialist
//           </p>
//           <button className="bg-white text-[var(--color-primary)] hover:bg-[var(--color-accentlight)] hover:text-[var(--color-secondary)] font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
//             Contact Our Team
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Departments;


// pages/Departments.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import DepartmentCard from '../components/DepartmentCard';

const Departments = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departmentsData.map((department, index) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;