// pages/DoctorDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../components/Loader"
const DoctorDetail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchDoctor = async () => {
    try {
      const response = await fetch(`${backendUrl}/getAll/all-doctors/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log("API Response:", data); // Debugging log
      
      if (response.ok) {
        // Check if data contains a doctor array with at least one doctor
        if (data.doctor && data.doctor.length > 0) {
          const doctorData = data.doctor[0]; // Get the first doctor in the array
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

  if (loading) {
    return <div className="text-center py-12"><Loader /></div>;
  }

  if (!doctor) {
    return <div className="text-center py-12">Doctor not found</div>;
  }

  const handleBookAppointment = () => {
    // Logic to handle appointment booking
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Doctor Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-4 border-accent overflow-hidden mb-6">
                <img 
                  src={doctor.profilePhoto || '/default-doctor.jpg'} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/default-doctor.jpg';
                  }}
                />
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