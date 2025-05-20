import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";

  const fetchAppointments = useCallback(async (type, status = null) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('patientToken') || 
                    localStorage.getItem('doctorToken') || 
                    localStorage.getItem('hospitalToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      let url;
      if (type === 'doctor') {
        url = `${backendUrl}/appointment/doctors/appointments`;
      } else if (type === 'patient') {
        url = `${backendUrl}/appointment/patient`;
      } else {
        url = `${backendUrl}/appointment/${type}/appointments`;
      }
      
      if (status) {
        url += `?status=${status}`;
      }

      // console.log('Fetching appointments from:', url);
      // console.log('With token:', token.substring(0, 10) + '...');
  
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // console.log('Appointments response:', response.data);
      
      if (response.data.appointments) {
        setAppointments(response.data.appointments);
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to fetch appointments');
      toast.error(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

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

      // toast.success('Appointment confirmed successfully');
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