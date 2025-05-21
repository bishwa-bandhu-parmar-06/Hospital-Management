import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

const AllHospitals = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHospitals = async() => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-hospitals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log("Fetched hospitals data:", data);
        if (response.ok) {
          // Filter to only show approved hospitals
          const approvedHospitals = Array.isArray(data.hospital) 
            ? data.hospital.filter(hospital => hospital.status === "approved")
            : [];
          setHospitals(approvedHospitals);
        } else {
          toast.error(data.message || "Failed to fetch hospitals");
          setHospitals([]);
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Fetch hospitals error:", error);
        setHospitals([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchAllHospitals();
  }, [backendUrl]);

  const handleHospitalClick = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Hospitals</h1>

      {hospitals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No hospitals available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hospitals.map((hospital) => (
            <div 
              key={hospital._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleHospitalClick(hospital._id)}
            >
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {hospital.profilePicture ? (
                      <img 
                        src={hospital.profilePicture} 
                        alt={hospital.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400">
                        {hospital.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">{hospital.name}</h2>
                <div className="text-gray-600 text-sm space-y-1">
                  <p className="flex items-center truncate">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="truncate">{hospital.email}</span>
                  </p>
                  <p className="flex items-center truncate">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span className="truncate">{hospital.address || "Address not provided"}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    {hospital.contactNumber || "Not provided"}
                  </p>
                </div>
                <div className="mt-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full text-center">
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllHospitals;