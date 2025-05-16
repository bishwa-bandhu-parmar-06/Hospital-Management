// get all admins , get all doctors, get all hospitals, get all users

const backendUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000';
import { handleResponse } from '../context/HelperHandleResponse';

export const getAllUsers = async () => {
    const response = await fetch(`${backendUrl}/users`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
    });
    return handleResponse(response);
}