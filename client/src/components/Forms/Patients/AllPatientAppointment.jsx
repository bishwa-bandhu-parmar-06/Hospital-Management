import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPatientAppointment = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const token = localStorage.getItem('patientToken');
        // console.log("Patient Token : ", token);
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await axios.get(`${backendUri}/appointment/get-appointments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("Response : ", response);
        // console.log("Appointments : ", response.data?.appointments);
        // Add null check and default to empty array if undefined
        setAppointments(response.data?.appointments || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        setAppointments([]); // Ensure appointments is always an array
        setLoading(false);
      }
    };

    fetchAllAppointments();
    const interval = setInterval(fetchAllAppointments, 30000);
    return () => clearInterval(interval);
  }, [navigate, filter]);

  // Safely filter appointments - now guaranteed to be an array
  const filteredAppointments = appointments.filter(appt => {
    if (filter === 'all') return true;
    if (filter === 'doctor') return appt?.doctor;
    if (filter === 'hospital') return appt?.hospital;
    return true;
  });

  // Rest of your component remains the same...
  const getAppointmentType = (appointment) => {
    if (appointment?.doctor) return 'Doctor';
    if (appointment?.hospital) return 'Hospital';
    return 'Unknown';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="text-center py-8">Loading appointments...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-secondary text-white' : 'bg-gray-200'}`}
        >
          All Appointments
        </button>
        <button
          onClick={() => setFilter('doctor')}
          className={`px-4 py-2 rounded ${filter === 'doctor' ? 'bg-secondary text-white' : 'bg-gray-200'}`}
        >
          Doctor Appointments
        </button>
        <button
          onClick={() => setFilter('hospital')}
          className={`px-4 py-2 rounded ${filter === 'hospital' ? 'bg-secondary text-white' : 'bg-gray-200'}`}
        >
          Hospital Appointments
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">With</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getAppointmentType(appointment)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.doctor?.name || appointment.hospital?.name || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.doctor?.specialization || appointment.hospital?.address || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="mb-1">
                      <strong>Symptoms:</strong> {appointment.symptoms || 'None'}
                    </div>
                    {appointment.cancellationReason && (
                      <div>
                        <strong>Cancel Reason:</strong> {appointment.cancellationReason}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPatientAppointment;