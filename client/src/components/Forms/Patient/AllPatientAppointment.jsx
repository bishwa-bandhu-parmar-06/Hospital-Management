import React, { useEffect } from 'react';
import { useAppointment } from '../../../context/AppointmentContext';
import Loader from '../../Loader';

const AllPatientAppointment = () => {
    const { appointments, loading, error, fetchAppointments } = useAppointment();

    useEffect(() => {
        fetchAppointments('patient');
    }, [fetchAppointments]);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
            {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments found.</p>
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
                                        Dr. {appointment.doctor.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {appointment.hospital?.name || 'Online Consultation'}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        appointment.status === 'confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : appointment.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {appointment.status.charAt(0).toUpperCase() +
                                        appointment.status.slice(1)}
                                </span>
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

export default AllPatientAppointment; 