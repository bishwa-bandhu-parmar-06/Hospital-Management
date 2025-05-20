import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppointment } from '../../../context/AppointmentContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Loader from '../../Loader';
import { toast } from 'react-toastify';

const BookAppointmentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookAppointment } = useAppointment();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        doctorId: location.state?.doctorId || '',
        hospitalId: location.state?.hospitalId || '',
        date: new Date(),
        startTime: '10:00',
        endTime: '10:30',
        symptoms: '',
        notes: ''
    });

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
        if (!formData.doctorId) {
            toast.error('Please select a doctor first');
            navigate('/doctors');
            return;
        }

        try {
            setLoading(true);
            await bookAppointment({
                ...formData,
                date: formData.date.toISOString().split('T')[0]
            });
            // toast.success('Appointment booked successfully');
            navigate('/patient/dashboard');
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Date
                    </label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Start Time
                        </label>
                        <TimePicker
                            onChange={(time) => handleTimeChange(time, 'startTime')}
                            value={formData.startTime}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            End Time
                        </label>
                        <TimePicker
                            onChange={(time) => handleTimeChange(time, 'endTime')}
                            value={formData.endTime}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Symptoms
                    </label>
                    <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="3"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Additional Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
                    disabled={loading}
                >
                    {loading ? 'Booking...' : 'Book Appointment'}
                </button>
            </form>
        </div>
    );
};

export default BookAppointmentForm;