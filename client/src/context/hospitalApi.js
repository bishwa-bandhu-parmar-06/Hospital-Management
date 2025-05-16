const backendUrl =
  import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
import { handleResponse } from "../context/HelperHandleResponse";

export const registerHospital = async (formData) => {
  const response = await fetch(`${backendUrl}/hospital/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};
export const loginHospital = async (email) => {
  const response = await fetch(`${backendUrl}/hospital/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};
export const verifyRegisterHospitalOtp = async (email, otp) => {
  const response = await fetch(`${backendUrl}/hospital/verify-register-email-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};
export const verifyLoginHospitalOtp = async (email, otp) => {
  const response = await fetch(`${backendUrl}/hospital/verify-login-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};
export const resendHospitalOtp = async (email, isRegister) => {
  const endpoint = isRegister ? "/hospital/register" : "/hospital/login";
  const response = await fetch(`${backendUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};
export const updateHospitalProfile = async (formData) => {
  const response = await fetch(`${backendUrl}/hospital/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
    },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const getHospitalProfile = async () => {
  const response = await fetch(`${backendUrl}/hospital/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
    },
  });
  return handleResponse(response);
};

export const getHospitalById = async (hospitalId) => {
  const response = await fetch(`${backendUrl}/hospital/${hospitalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return handleResponse(response);
};

export const updateHospitalById = async (hospitalId, formData) => {
  const response = await fetch(`${backendUrl}/hospital/${hospitalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const deleteHospitalById = async (hospitalId) => {
  const response = await fetch(`${backendUrl}/hospital/${hospitalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  return handleResponse(response);
};
export const logoutHospital = async () => {
  const response = await fetch(`${backendUrl}/hospital/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
    },
  });
  return handleResponse(response);
};
