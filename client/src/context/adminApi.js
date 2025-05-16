const backendUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000/api/v1';
import { handleResponse } from '../context/HelperHandleResponse';

export const registerAdmin = async(formData) =>{
    const response = await fetch(`${backendUrl}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    return handleResponse(response);
}

export const verifyRegisterAdminOtp = async(email, otp) =>{
    const response = await fetch(`${backendUrl}/admin/verify-register-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });
    return handleResponse(response);
}

export const loginAdmin = async(email) => {
    const response = await fetch(`${backendUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    return handleResponse(response);
}

export const verifyAdminLoginOtp = async(email, otp) => {
    const response = await fetch(`${backendUrl}/admin/verify-login-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });
    return handleResponse(response);
}

export const updateAdminProfile = async(formData) => {
    const response = await fetch(`${backendUrl}/admin/update-profile`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData),
    });
    return handleResponse(response);
}
export const getAdminProfile = async() => {
    const response = await fetch(`${backendUrl}/admin/profile`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
    });
    return handleResponse(response);
}


export const resendAdminOtp = async(email, isRegister) => {
    const endpoint = isRegister ? '/admin/register' : '/admin/login';
    const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    return handleResponse(response);
}

export const deleteAdminProfile = async() => {
    const response = await fetch(`${backendUrl}/admin/delete-admin`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
    });
    return handleResponse(response);
}


export const logoutAdmin = async() => {
    const response = await fetch(`${backendUrl}/admin/logout`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
    });
    return handleResponse(response);
}

export const approveDoctor = async(doctorId) =>{
    const response = await fetch(`${backendUrl}/admin/approve/doctor/:${doctorId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ doctorId }),
    });
    
    return handleResponse(response);
}

export const getPendingApprovals = async() =>{
    const response = await fetch(`${backendUrl}/admin/approvals/pending`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
    })
    return handleResponse(response);
}


export const approveHospital = async(hospitalId) =>{
    const response = await fetch(`${backendUrl}/admin/approve/hospital/:${hospitalId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ hospitalId }),
    });
    
    return handleResponse(response);
}

