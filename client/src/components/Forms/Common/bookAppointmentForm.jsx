import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const BookAppointmentForm = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        doctorId: '',
        hospitalId: '',
        date: new Date(),
        startTime: '10:00',
        endTime: '10:30',
        type: 'offline',
        symptoms: '',
        notes: ''
    });

    // Get token from localStorage
    const token = localStorage.getItem('patientToken');

    useEffect(() => {
        if (!token) {
            navigate('/auth', { replace: true });
            return;
        }

        const fetchData = async () => {
            try {
                const [doctorsRes, hospitalsRes] = await Promise.all([
                    axios.get('/api/doctors/approved', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('/api/hospitals/approved', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setDoctors(doctorsRes.data);
                setHospitals(hospitalsRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date
        }));
    };

    const handleTimeChange = (time, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: time
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/appointments', {
                ...formData,
                date: formData.date.toISOString().split('T')[0]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Appointment booked successfully!');
            navigate('/appointments');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert(error.response?.data?.message || 'Failed to book appointment');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {/* Rest of your form remains the same as before */}
                {/* ... */}
            </form>
        </div>
    );
};

export default BookAppointmentForm;