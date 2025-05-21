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
        <div className="min-h-screen bg-accentlight py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold text-secondary">Book Your Appointment</h1>
                    <p className="mt-2 text-lg text-gray-600">Fill in the details to schedule your visit</p>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-textPrimary mb-1">
                                        Appointment Date
                                    </label>
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                        required
                                        dateFormat="MMMM d, yyyy"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-textPrimary mb-1">
                                        Time Slot
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                                            <TimePicker
                                                onChange={(time) => handleTimeChange(time, 'startTime')}
                                                value={formData.startTime}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                                required
                                                disableClock
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">End Time</label>
                                            <TimePicker
                                                onChange={(time) => handleTimeChange(time, 'endTime')}
                                                value={formData.endTime}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                                required
                                                disableClock
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textPrimary mb-1">
                                    Symptoms
                                </label>
                                <textarea
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                    rows="4"
                                    placeholder="Describe your symptoms in detail"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textPrimary mb-1">
                                    Additional Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                    rows="3"
                                    placeholder="Any additional information you'd like to share"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : 'Confirm Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointmentForm;