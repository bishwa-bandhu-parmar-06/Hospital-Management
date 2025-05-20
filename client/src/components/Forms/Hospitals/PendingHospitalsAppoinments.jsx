import React, { useEffect } from 'react';
import { useAppointment } from '../../../context/AppointmentContext';
import Loader from '../../Loader';

const PendingHospitalsAppoinments = () => {
    const {
        appointments,
        loading,
        error,
        fetchAppointments,
        confirmAppointment,
        cancelAppointment
    } = useAppointment();

    useEffect(() => {
        fetchAppointments('hospital', 'pending');
    }, [fetchAppointments]);

    const handleConfirm = async (appointmentId) => {
        try {
            await confirmAppointment(appointmentId);
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            await cancelAppointment(appointmentId);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Pending Hospital Appointments</h1>
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
                                        Patient: {appointment.patient.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        Doctor: Dr. {appointment.doctor.name}
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
                                    <p className="text-gray-600">Type</p>
                                    <p className="font-medium capitalize">
                                        {appointment.type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Symptoms</p>
                                    <p className="font-medium">{appointment.symptoms}</p>
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

export default PendingHospitalsAppoinments;