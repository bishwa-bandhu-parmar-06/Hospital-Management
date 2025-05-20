import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentContext = createContext();

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";

  const fetchAppointments = async (type) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('patientToken') || 
                    localStorage.getItem('doctorToken') || 
                    localStorage.getItem('hospitalToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${backendUrl}/appointment/${type}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(response.data.appointments);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (appointmentData) => {
    try {
      const token = localStorage.getItem('patientToken');
      if (!token) {
        throw new Error('Please login as a patient to book appointments');
      }

      const response = await axios.post(`${backendUrl}/appointment`, appointmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Appointment booked successfully');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book appointment');
      throw err;
    }
  };

  const confirmAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('doctorToken') || localStorage.getItem('hospitalToken');
      if (!token) {
        throw new Error('Unauthorized to confirm appointments');
      }

      const response = await axios.put(
        `${backendUrl}/appointment/${appointmentId}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Appointment confirmed successfully');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm appointment');
      throw err;
    }
  };

  const cancelAppointment = async (appointmentId, reason) => {
    try {
      const token = localStorage.getItem('patientToken') || 
                    localStorage.getItem('doctorToken') || 
                    localStorage.getItem('hospitalToken');
      
      if (!token) {
        throw new Error('Unauthorized to cancel appointments');
      }

      const response = await axios.put(
        `${backendUrl}/appointment/${appointmentId}/cancel`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Appointment cancelled successfully');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment');
      throw err;
    }
  };

  const value = {
    appointments,
    loading,
    error,
    fetchAppointments,
    bookAppointment,
    confirmAppointment,
    cancelAppointment
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext; 