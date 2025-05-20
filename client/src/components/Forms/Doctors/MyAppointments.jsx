import React, { useEffect, useState } from 'react';
import { useAppointment } from '../../../context/AppointmentContext';
import { toast } from 'react-toastify';
import Loader from '../../Loader';

const MyAppointments = () => {
    const { appointments, loading, error, fetchAppointments, cancelAppointment } = useAppointment();
    const [confirmedCount, setConfirmedCount] = useState(0);

    useEffect(() => {
        fetchAppointments('doctor', 'confirmed');
    }, [fetchAppointments]);

    useEffect(() => {
        setConfirmedCount(appointments.length);
    }, [appointments]);

    const handleCancel = async (appointmentId) => {
        const reason = window.prompt('Please provide a reason for cancellation:');
        if (reason === null) return; // User cancelled the prompt
        
        try {
            await cancelAppointment(appointmentId, reason);
            toast.success('Appointment cancelled successfully');
            fetchAppointments('doctor', 'confirmed'); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel appointment');
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Confirmed Appointments</h1>
                {confirmedCount > 0 && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {confirmedCount} Confirmed
                    </span>
                )}
            </div>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No confirmed appointments found.</p>
            ) : (
                <div className="grid gap-6">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment._id}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Patient: {appointment.patient.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {appointment.hospital?.name || 'Online Consultation'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        Confirmed
                                    </span>
                                    <button
                                        onClick={() => handleCancel(appointment._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-gray-600">Date</p>
                                    <p className="font-medium">
                                        {new Date(appointment.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Time</p>
                                    <p className="font-medium">
                                        {appointment.startTime} - {appointment.endTime}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Symptoms</p>
                                    <p className="font-medium">{appointment.symptoms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Contact</p>
                                    <p className="font-medium">{appointment.patient.mobile || appointment.patient.email}</p>
                                </div>
                            </div>
                            {appointment.notes && (
                                <div className="mt-4">
                                    <p className="text-gray-600">Additional Notes</p>
                                    <p className="font-medium">{appointment.notes}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointments;