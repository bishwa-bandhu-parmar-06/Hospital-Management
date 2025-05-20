import React, { useEffect, useState } from 'react';
import { useAppointment } from '../../../context/AppointmentContext';
import { toast } from 'react-toastify';
import Loader from '../../Loader';

const PendingAppointments = () => {
    const {
        appointments,
        loading,
        error,
        fetchAppointments,
        confirmAppointment,
        cancelAppointment
    } = useAppointment();
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        console.log('PendingAppointments mounted');
        const loadAppointments = async () => {
            try {
                await fetchAppointments('doctor', 'pending');
            } catch (err) {
                console.error('Error loading appointments:', err);
            }
        };
        loadAppointments();
    }, [fetchAppointments]);

    useEffect(() => {
        console.log('Appointments updated:', appointments);
        setPendingCount(appointments.length);
    }, [appointments]);

    const handleConfirm = async (appointmentId) => {
        try {
            await confirmAppointment(appointmentId);
            toast.success('Appointment confirmed successfully');
            await fetchAppointments('doctor', 'pending'); // Refresh the list
        } catch (error) {
            console.error('Error confirming appointment:', error);
            toast.error(error.response?.data?.message || 'Failed to confirm appointment');
        }
    };

    const handleCancel = async (appointmentId) => {
        const reason = window.prompt('Please provide a reason for cancellation:');
        if (reason === null) return; // User cancelled the prompt
        
        try {
            await cancelAppointment(appointmentId, reason);
            toast.success('Appointment cancelled successfully');
            await fetchAppointments('doctor', 'pending'); // Refresh the list
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            toast.error(error.response?.data?.message || 'Failed to cancel appointment');
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Pending Appointments</h1>
                {pendingCount > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {pendingCount} Pending
                    </span>
                )}
            </div>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No pending appointments found.</p>
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
                                        Patient: {appointment.patient?.name || 'Unknown Patient'}
                                    </h2>
                                    <p className="text-gray-600">
                                        {appointment.hospital?.name || 'Online Consultation'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleConfirm(appointment._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Confirm
                                    </button>
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
                                    <p className="font-medium">
                                        {appointment.patient?.mobile || appointment.patient?.email || 'N/A'}
                                    </p>
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

export default PendingAppointments;