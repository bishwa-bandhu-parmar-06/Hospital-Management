import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PendingDoctorAppointments = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await axios.get(`${backendUri}/appointment/get-appointments?status=pending&type=doctor`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAppointments(response.data.appointments || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
        toast.error(err.response?.data?.message || 'Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchPendingAppointments();
  }, [navigate]);

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('doctorToken');
      await axios.put(`${backendUri}/appointment/${appointmentId}/confirm`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAppointments(appointments.map(appt => 
        appt._id === appointmentId ? { ...appt, status: 'confirmed' } : appt
      ));
      toast.success('Appointment confirmed successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to confirm appointment';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleCancelAppointment = async (appointmentId, reason = "Cancelled by doctor") => {
    try {
      const token = localStorage.getItem('doctorToken');
      await axios.put(`${backendUri}/appointment/${appointmentId}/cancel`, { reason }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAppointments(appointments.map(appt => 
        appt._id === appointmentId ? { ...appt, status: 'cancelled' } : appt
      ));
      toast.success('Appointment cancelled successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to cancel appointment';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (loading) return <div className="text-center py-8">Loading appointments...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pending Appointments</h1>
        {appointments.length > 0 && (
          <span className="bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {appointments.length} Pending
          </span>
        )}
      </div>
      
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No pending appointments found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Symptoms</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.patient?.mobile || ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm text-gray-900">
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                    {appointment.symptoms || 'None provided'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sm:px-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleConfirmAppointment(appointment._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
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

export default PendingDoctorAppointments;