// pages/DoctorDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../../Loader";
import { jwtDecode } from 'jwt-decode'; // Corrected import

const DoctorDetail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from token if exists
    let tokenToDecode;
    const patientToken = localStorage.getItem('patientToken');
    const doctorToken = localStorage.getItem('doctorToken');
    const hospitalToken = localStorage.getItem('hospitalToken');
    const adminToken = localStorage.getItem('adminToken');

    if (patientToken) tokenToDecode = patientToken;
    else if (doctorToken) tokenToDecode = doctorToken;
    else if (hospitalToken) tokenToDecode = hospitalToken;
    else if (adminToken) tokenToDecode = adminToken;
    console.log("Token to decode:", tokenToDecode);
    // Decode the token to get user role
    if (tokenToDecode) {

      try {
        const decoded = jwtDecode(tokenToDecode);
        console.log("Decoded token:", decoded);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Optionally: toast.error("Session error. Please log in again.");
      }
    }

    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-doctors/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        
        if (response.ok) {
          if (data.doctor && data.doctor.length > 0) {
            const doctorData = data.doctor[0];
            if (doctorData.status === "approved") {
              setDoctor(doctorData);
            } else {
              toast.error("Doctor not approved");
              navigate('/doctors');
            }
          } else {
            toast.error("Doctor not found");
            navigate('/doctors');
          }
        } else {
          toast.error(data.message || "Failed to fetch doctor");
          navigate('/doctors');
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Fetch doctor error:", error);
        navigate('/doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [backendUrl, id, navigate]);

  const handleBookAppointment = () => {
    // First check for any valid token
    const token = localStorage.getItem('patientToken');

    if (!token) {
      toast.error("Please login as a patient to book an appointment");
      navigate('/auth', { replace: true });
      return;
    }

    // Immediately decode to check role
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token in click handler:", decoded);
      
      if (decoded.role !== 'patient') {
        toast.error("Only patients can book appointments");
        return;
      }

      // If we get here, proceed to booking
      navigate('/book-appointment', { 
        state: { 
          doctorId: id, 
          doctorName: doctor.name 
        },
        replace: true 
      });
    } catch (error) {
      console.error("Token decode error:", error);
      toast.error("Session error. Please login again");
      navigate('/auth', { replace: true });
    }
  };

  if (loading) {
    return <div className="text-center py-12"><Loader /></div>;
  }

  if (!doctor) {
    return <div className="text-center py-12">Doctor not found</div>;
  }
  return (
    <div className="bg-accentlight py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Doctor Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center">
              <div className="relative h-48 flex items-center justify-center">
                {doctor.profilePhoto ? (
                  <img
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ""; // Consider a default placeholder image if available
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                      {doctor.name?.charAt(0).toUpperCase() || "D"}
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-secondary mb-2">{doctor.name}</h1>
              <p className="text-primary font-medium mb-4">{doctor.specialization || 'General Practitioner'}</p>
              
              <div className="w-full bg-accentlight rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-secondary mb-2">Availability</h3>
                <p className="text-gray-700">{doctor.availability || 'Monday to Friday, 9am-5pm'}</p>
                <p className="text-gray-700">{doctor.consultationHours || 'By appointment'}</p>
              </div>

              <button
                onClick={handleBookAppointment}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mb-4"
              >
                Book Appointment
              </button>

              <Link 
                to="/doctors" 
                className="text-primary hover:text-secondary font-medium underline"
              >
                ← Back to Doctors
              </Link>
            </div>

            {/* Doctor Details */}
            <div className="md:w-2/3 p-8 border-l border-gray-200">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary mb-4">About Dr. {doctor.name.split(' ')[1] || doctor.name}</h2>
                <p className="text-gray-700">{doctor.bio || 'No information available'}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Education</h3>
                  <p className="text-gray-700">{doctor.education || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Experience</h3>
                  <p className="text-gray-700">{doctor.experience || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Location</h3>
                  <p className="text-gray-700">{doctor.hospital || 'Not specified'}</p>
                  <p className="text-gray-700">Room: {doctor.roomNumber || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Languages Spoken</h3>
                  <p className="text-gray-700">{doctor.languages ? doctor.languages.join(', ') : 'English'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;