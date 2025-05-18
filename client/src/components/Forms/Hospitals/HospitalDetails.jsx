import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../../Loader";

const HospitalDetails = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-hospitals/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        
        if (response.ok) {
          if (data.hospital && data.hospital.length > 0) {
            const hospitalData = data.hospital[0];
            if (hospitalData.status === "approved") {
              setHospital(hospitalData);
            } else {
              toast.error("Hospital not approved");
              navigate('/hospitals');
            }
          } else {
            toast.error("Hospital not found");
            navigate('/hospitals');
          }
        } else {
          toast.error(data.message || "Failed to fetch hospital");
          navigate('/hospitals');
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Fetch hospital error:", error);
        navigate('/hospitals');
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [backendUrl, id, navigate]);

  if (loading) {
    return <div className="text-center py-12"><Loader /></div>;
  }

  if (!hospital) {
    return <div className="text-center py-12">Hospital not found</div>;
  }

  return (
    <div className="bg-accentlight py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Hospital Image and Basic Info */}
            <div className="md:w-1/3 p-8 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-4 border-accent overflow-hidden mb-6">
                {hospital.profilePicture ? (
                  <img 
                    src={hospital.profilePicture} 
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/default-hospital.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">
                      {hospital.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-secondary mb-2">{hospital.name}</h1>
              
              <div className="w-full bg-accentlight rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-secondary mb-2">Contact Information</h3>
                <p className="text-gray-700 flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  {hospital.email}
                </p>
                <p className="text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {hospital.mobile || "Not provided"}
                </p>
              </div>

              {hospital.website && (
                <a 
                  href={hospital.website.startsWith('http') ? hospital.website : `https://${hospital.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mb-4 text-center"
                >
                  Visit Website
                </a>
              )}

              <Link 
                to="/hospitals" 
                className="text-primary hover:text-secondary font-medium underline"
              >
                ← Back to Hospitals
              </Link>
            </div>

            {/* Hospital Details */}
            <div className="md:w-2/3 p-8 border-l border-gray-200">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary mb-4">About {hospital.name}</h2>
                <p className="text-gray-700">
                  {hospital.description || 'No information available about this hospital.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Address</h3>
                  <p className="text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {hospital.address || 'Address not provided'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Facilities</h3>
                  {hospital.facilities && hospital.facilities.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {hospital.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No facilities listed</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Departments</h3>
                  {hospital.departments && hospital.departments.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {hospital.departments.map((department, index) => (
                        <li key={index}>{department}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No departments listed</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Verification Status</h3>
                  <div className="flex items-center">
                    {hospital.isVerified ? (
                      <>
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-green-700">Verified</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-yellow-700">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;