import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminApprovalDashboard = ({ onClose, pendingDoctors, pendingHospitals, setPendingDoctors, setPendingHospitals, }) => {
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";


const handleApproval = async (id, type, action) => {
  try {
    const token = localStorage.getItem('adminToken');
    let reason = `${action === "approve" ? "Approved" : "Rejected"} by admin`;

    // For rejections, ask for a reason
    if (action === "reject") {
      reason = prompt(`Please enter the reason for rejecting this ${type}:`);
      if (!reason) {
        toast.error("Reason is required for rejection");
        return;
      }
    }

    const endpoint = `${backendUrl}/admin/approve/${type}/${id}`;
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ action, reason }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Update the correct state based on type
      if (type === "doctor") {
        setPendingDoctors(prev => prev.filter(item => item._id !== id));
      } else {
        setPendingHospitals(prev => prev.filter(item => item._id !== id));
      }
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} ${action}d successfully`);
    } else {
      toast.error(data.message || `Failed to ${action} ${type}`);
    }
  } catch (error) {
    toast.error(`Error processing ${action} request`);
    console.error(`Error in handleApproval (${type} ${action}):`, error);
  }
};
// const approveDoctor = async (doctorId) => {
//   try {
//     const token = localStorage.getItem('adminToken');
//     const response = await fetch(`${backendUrl}/admin/approve/doctor/${doctorId}`, {
//       method: 'PUT',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ action: "approve", reason: "Approved by admin" }),
//     });
    
//     const data = await response.json();
//     if (response.ok) {
//       setPendingDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
//       toast.success('Doctor approved successfully');
//     }
//     else {
//       setStatus({ type: 'error', message: data.message });
//       toast.error(data.message);
//     }
//   } catch (error) {
//     setStatus({ type: 'error', message: 'An error occurred while approving the doctor.' });
//   }
// }

// functions to reject doctors and hospitals

// Function to approve a hospital
// const approveHospital = async(hospitalId) =>{
//   try {
//     const token = localStorage.getItem('adminToken');
//     const response = await fetch(`${backendUrl}/admin/approve/hospital/${hospitalId}`,{
//       method: 'PUT',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ action: "approve", reason: "Approved by admin" }),
//     })
//     const data = await response.json();
//     if (response.ok) {
//       setPendingHospitals((prevHospitals) => prevHospitals.filter((hospital) => hospital._id !== hospitalId));
//       toast.success('Hospital approved successfully');
//     }
//     else {
//       setStatus({ type: 'error', message: data.message });
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error("Error While Approving Hospitals : ", error);
//     toast.error("Couldn't approve the hospital");
//   }
// }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-secondary)]">
          Admin Approval Dashboard
        </h1>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* Pending Doctors Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4 text-center">
            Pending Doctors ({pendingDoctors.length})
          </h2>
          {pendingDoctors.length > 0 ? (
            <div className="space-y-4">
              {pendingDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold">Name : {doctor.name}</h3>
                  <p>Email: {doctor.email}</p>
                  <p>Mobile: {doctor.mobile}</p>
                  <p>Specialization: {doctor.specialization}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleApproval(doctor._id, "doctor", "approve")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Approve
                    </button>
                    <button onClick={() => handleApproval(doctor._id, "doctor", "reject")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No pending doctor requests</p>
          )}
        </div>

        {/* Pending Hospitals Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4 text-center">
            Pending Hospitals ({pendingHospitals.length})
          </h2>
          {pendingHospitals.length > 0 ? (
            <div className="space-y-4">
              {pendingHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="border p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold">{hospital.name}</h3>
                  <p>Email: {hospital.email}</p>
                  <p>Mobile: {hospital.mobile}</p>
                  <p>Address: {hospital.address}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleApproval(hospital._id, "hospital", "approve")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Approve
                    </button>
                    <button onClick={() => handleApproval(hospital._id, "hospital", "reject")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No pending hospital requests</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalDashboard;