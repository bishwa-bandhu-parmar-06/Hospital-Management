import React from 'react';
import { toast } from 'react-toastify';

const AppointmentCard = ({ 
  appointment, 
  onConfirm, 
  onCancel, 
  showActions = true,
  showHospital = true,
  showStatus = false
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {appointment.patient?.name || appointment.doctor?.name || 'N/A'}
        </h3>
        {showStatus && (
          <div className="ml-2">
            {getStatusBadge(appointment.status)}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Date:</span> {formatDate(appointment.date)}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Time:</span> {appointment.startTime} - {appointment.endTime}
          </p>
          {showHospital && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Hospital:</span> {appointment.hospital?.name || 'Clinic'}
            </p>
          )}
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Symptoms:</span> {appointment.symptoms || 'None provided'}
          </p>
          {appointment.cancellationReason && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Cancel Reason:</span> {appointment.cancellationReason}
            </p>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {appointment.status === 'pending' && (
            <button
              onClick={() => onConfirm(appointment._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
            >
              Confirm
            </button>
          )}
          <button
            onClick={() => onCancel(appointment._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
          >
            {appointment.status === 'pending' ? 'Reject' : 'Cancel'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;