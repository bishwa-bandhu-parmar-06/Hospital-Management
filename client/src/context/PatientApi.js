const backendUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000/api/v1';
import { handleResponse } from '../context/HelperHandleResponse';

export const registerPatient = async (formData) => {
  const response = await fetch(`${backendUrl}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const loginPatient = async (email) => {
  try {
    const response = await fetch(`${backendUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }), // Properly formatted
    });
    
    const data = await handleResponse(response);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send OTP');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw to handle in the component
  }
};

export const verifyRegisterOtp = async (email, otp) => {
  const response = await fetch(`${backendUrl}/users/verify-register-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};

export const verifyLoginOtp = async (email, otp) => {
  try {
    const response = await fetch(`${backendUrl}/users/verify-login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    
    const data = await handleResponse(response);
    
    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed');
    }
    
    return data;
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

export const resendOtp = async (email, isRegister) => {
  const endpoint = isRegister ? '/users/register' : '/users/login';
  const response = await fetch(`${backendUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

