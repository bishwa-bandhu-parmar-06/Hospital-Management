import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../Loader';
import { useNavigate } from 'react-router-dom';
const AllDoctors = ({onClose}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log("Fetched doctors data:", data);
        if (response.ok) {
          const approvedDoctors = data.doctor.filter(doctor => doctor.status === "approved");
        //   console.log("Approved doctors:", approvedDoctors);
          setDoctors(approvedDoctors);
        } else {
          toast.error(data.message || "Failed to fetch doctors");
          setDoctors([]);
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Fetch doctors error:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, [backendUrl]);

  const handleDoctorClick = (id) => {
    navigate(`/doctors/${id}`);
  };
  return (
    <div className="min-h-screen bg-accentlight p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Approved Doctors</h1>

      {loading ? (
        <Loader />
      ) : doctors.length === 0 ? (
        <p className="text-center">No approved doctors found.</p>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={()=>handleDoctorClick(doctor._id)} 
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-gray-600 mb-1">Email: {doctor.email}</p>
              <p className="text-gray-600 mb-1">Mobile: {doctor.mobile}</p>
              <p className="text-gray-600">Role: {doctor.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
