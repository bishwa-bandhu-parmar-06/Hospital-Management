// components/admin/AdminApprovalDashboard.jsx
import React, { useState } from 'react';

const AdminApprovalDashboard = ({ 
  pendingDoctors, 
  pendingHospitals, 
  onApproveDoctor, 
  onApproveHospital,
  loading 
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleDoctorAction = (action) => {
    onApproveDoctor(selectedDoctor._id, action, rejectionReason);
    setSelectedDoctor(null);
    setRejectionReason('');
  };

  const handleHospitalAction = (action) => {
    onApproveHospital(selectedHospital._id, action, rejectionReason);
    setSelectedHospital(null);
    setRejectionReason('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6">
        Pending Approvals
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Doctors Section */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Doctors ({pendingDoctors.length})
          </h3>
          
          {pendingDoctors.length === 0 ? (
            <p className="text-[var(--color-text-primary)]">No pending doctor approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingDoctors.map(doctor => (
                <div key={doctor._id} className="border border-[var(--color-accent)] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {doctor.profilePhoto && (
                      <img 
                        src={doctor.profilePhoto} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">{doctor.name}</h4>
                      <p className="text-sm text-[var(--color-text-primary)]">{doctor.specialty}</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{doctor.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="px-3 py-1 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)]"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hospitals Section */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Hospitals ({pendingHospitals.length})
          </h3>
          
          {pendingHospitals.length === 0 ? (
            <p className="text-[var(--color-text-primary)]">No pending hospital approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingHospitals.map(hospital => (
                <div key={hospital._id} className="border border-[var(--color-accent)] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {hospital.logo && (
                      <img 
                        src={hospital.logo} 
                        alt={hospital.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">{hospital.name}</h4>
                      <p className="text-sm text-[var(--color-text-primary)]">{hospital.address}</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{hospital.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => setSelectedHospital(hospital)}
                      className="px-3 py-1 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)]"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Approval Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">
              Review Doctor: {selectedDoctor.name}
            </h3>
            
            <div className="mb-4">
              <p className="text-[var(--color-text-primary)]"><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Email:</strong> {selectedDoctor.email}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Mobile:</strong> {selectedDoctor.mobile}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Qualifications:</strong> {selectedDoctor.qualifications}</p>
            </div>

            <div className="mb-4">
              <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="rejectionReason">
                Rejection Reason (if applicable)
              </label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2 border border-[var(--color-accent)] rounded"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleDoctorAction('approve')}
                disabled={loading}
                className="px-4 py-2 bg-[var(--color-success)] text-white rounded hover:bg-green-700 disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={() => handleDoctorAction('reject')}
                disabled={loading || !rejectionReason}
                className="px-4 py-2 bg-[var(--color-error)] text-white rounded hover:bg-red-700 disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Approval Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">
              Review Hospital: {selectedHospital.name}
            </h3>
            
            <div className="mb-4">
              <p className="text-[var(--color-text-primary)]"><strong>Address:</strong> {selectedHospital.address}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Email:</strong> {selectedHospital.email}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Phone:</strong> {selectedHospital.phone}</p>
              <p className="text-[var(--color-text-primary)]"><strong>Services:</strong> {selectedHospital.services?.join(', ')}</p>
            </div>

            <div className="mb-4">
              <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="rejectionReason">
                Rejection Reason (if applicable)
              </label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2 border border-[var(--color-accent)] rounded"
                rows="3"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleHospitalAction('approve')}
                disabled={loading}
                className="px-4 py-2 bg-[var(--color-success)] text-white rounded hover:bg-green-700 disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={() => handleHospitalAction('reject')}
                disabled={loading || !rejectionReason}
                className="px-4 py-2 bg-[var(--color-error)] text-white rounded hover:bg-red-700 disabled:opacity-70"
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={() => {
                  setSelectedHospital(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalDashboard;