import React, { useEffect, useState } from 'react';
import { useAppointment } from '../../../context/AppointmentContext';
import Loader from '../../Loader';

const AllPatientAppointment = () => {
    const { appointments, loading, error, fetchAppointments } = useAppointment();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            if (isInitialLoad) {
                await fetchAppointments('patient');
                setIsInitialLoad(false);
            }
        };
        loadAppointments();
    }, [fetchAppointments, isInitialLoad]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading && isInitialLoad) return <Loader />;
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
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(appointment.status)}`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
                                    <p className="text-gray-600">Symptoms</p>
                                    <p className="font-medium">{appointment.symptoms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Specialization</p>
                                    <p className="font-medium">{appointment.doctor.specialization}</p>
                                </div>
                            </div>
                            {appointment.notes && (
                                <div className="mt-4">
                                    <p className="text-gray-600">Additional Notes</p>
                                    <p className="font-medium">{appointment.notes}</p>
                                </div>
                            )}
                            {appointment.cancellationReason && (
                                <div className="mt-4">
                                    <p className="text-gray-600">Cancellation Reason</p>
                                    <p className="font-medium text-red-600">{appointment.cancellationReason}</p>
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