import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const PartnerHomePage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPartnerHospitals = async () => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-hospitals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        
        if (response.ok) {
          // Filter to only show approved hospitals
          const approvedHospitals = Array.isArray(data.hospital) 
            ? data.hospital.filter(hospital => hospital.status === "approved")
            : [];
          setHospitals(approvedHospitals.length > 0 ? approvedHospitals : demoHospitals);
        } else {
          toast.error(data.message || "Failed to fetch hospitals");
          setHospitals(demoHospitals);
        }
      } catch (error) {
        toast.error("Network error. Using demo data");
        console.error("Fetch hospitals error:", error);
        setHospitals(demoHospitals); 
      } finally {
        setLoading(false);
      }
    };
    fetchPartnerHospitals();
  }, [backendUrl]);

  const handleNavigation = () => {
    window.location.href = "/auth";
};
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-accentlight from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="animate-slideInRight mb-16">
          <h1 className="text-4xl md:text-4xl font-bold text-indigo-900 mb-4 text-center">
            Our Trusted <span className="text-primary">Hospital Partners</span>
          </h1>
          <p className="text-lg md:text-base text-gray-600 text-center max-w-3xl mx-auto">
            We collaborate with top-tier healthcare institutions to bring you the best medical services.
            These hospitals share our commitment to excellence in patient care.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {hospitals.map((hospital, index) => (
            <div 
              key={hospital._id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideInRight delay-${index * 100}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={hospital.profilePicture || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                  alt={hospital.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{hospital.name}</h3>
                  {hospital.isVerified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  {hospital.address}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(hospital.specialties || hospital.departments || ['General Medicine']).slice(0, 3).map((spec, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => window.location.href = `/hospital/${hospital._id}`}className="w-full mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12 text-center animate-slideInRight delay-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Partner With Us?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Join our network of premium healthcare providers and expand your reach to thousands of patients.
          </p>
          <button onClick={handleNavigation} className="px-8 py-3 bg-secondary text-white rounded-lg font-bold hover:bg-accent transition-colors duration-300 shadow-md hover:shadow-lg">
            Become a Partner
          </button>
        </div>
      </div>

      {/* Add custom animation styles */}
<style global>{`
  @keyframes slideInRight {
    from {
      transform: translateX(50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slideInRight {
    animation: slideInRight 0.6s ease-out forwards;
  }
  .delay-100 {
    animation-delay: 0.1s;
  }
  .delay-200 {
    animation-delay: 0.2s;
  }
  .delay-300 {
    animation-delay: 0.3s;
  }
  .delay-400 {
    animation-delay: 0.4s;
  }
  .delay-500 {
    animation-delay: 0.5s;
  }
`}</style>
    </div>
  );
};

export default PartnerHomePage;