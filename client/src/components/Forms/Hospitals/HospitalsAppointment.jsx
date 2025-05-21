import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HospitalConfirmedAppointments = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('confirmed');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalAppointments = async () => {
      try {
        const token = localStorage.getItem('hospitalToken');
        if (!token) {
          navigate('/hospital/login');
          return;
        }

        let url = `${backendUri}/appointment/get-appointments?status=${statusFilter}&type=hospital`;
        if (dateFilter) {
          url += `&date=${dateFilter}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAppointments(response.data.appointments || []);
        setLoading(false);
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to fetch appointments';
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
      }
    };

    fetchHospitalAppointments();
  }, [navigate, dateFilter, statusFilter]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('hospitalToken');
      
      if (newStatus === 'cancelled') {
        await axios.put(
          `${backendUri}/appointment/${appointmentId}/cancel`,
          { reason: "Updated by hospital" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Appointment cancelled successfully');
      } else if (newStatus === 'completed') {
        await axios.put(
          `${backendUri}/appointment/${appointmentId}/complete`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Appointment marked as completed');
      }

      setAppointments(appointments.map(appt => 
        appt._id === appointmentId ? { ...appt, status: newStatus } : appt
      ));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update appointment status';
      setError(errorMsg);
      toast.error(errorMsg);
    }
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Hospital Appointments</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <label htmlFor="date-filter" className="mr-2 whitespace-nowrap">Date:</label>
            <div className="flex items-center">
              <input
                type="date"
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              />
              {dateFilter && (
                <button 
                  onClick={() => setDateFilter('')}
                  className="ml-2 text-blue-500 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="status-filter" className="mr-2 whitespace-nowrap">Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Status</th>
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
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.doctor?.name || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.doctor?.specialization || ''}
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
                  <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sm:px-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {appointment.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(appointment._id, 'completed')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment._id, 'cancelled')}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <span className="text-green-600 text-sm">Completed</span>
                      )}
                      {appointment.status === 'cancelled' && (
                        <span className="text-red-600 text-sm">Cancelled</span>
                      )}
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

export default HospitalConfirmedAppointments;