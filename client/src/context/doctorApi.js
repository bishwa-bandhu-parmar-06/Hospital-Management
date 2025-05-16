// // doctor api 
// const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";

// import { handleResponse } from "../context/HelperHandleResponse";

// export const registerDoctor = async (formData) => {
//   const response = await fetch(`${backendUrl}/doctor/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   return handleResponse(response);
// }
// export const loginDoctor = async (email) => {
//   const response = await fetch(`${backendUrl}/doctor/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });
//   return handleResponse(response);
// };
// export const verifyRegisterDoctorOtp = async (email, otp) => {
//   const response = await fetch(`${backendUrl}/doctor/verify-register-otp`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, otp }),
//   });
//   return handleResponse(response);
// };
// export const verifyLoginDoctorOtp = async (email, otp) => {
//   const response = await fetch(`${backendUrl}/doctor/verify-login-otp`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, otp }),
//   });
//   return handleResponse(response);
// };
// export const resendDoctorOtp = async (email, isRegister) => {
//   const endpoint = isRegister ? "/doctor/register" : "/doctor/login";
//   const response = await fetch(`${backendUrl}${endpoint}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });
//   return handleResponse(response);
// };

// export const updateDoctorProfile = async (formData) => {
//   const response = await fetch(`${backendUrl}/doctor/update-profile`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
//     },
//     body: JSON.stringify(formData),
//   });
//   return handleResponse(response);
// };
// export const getDoctorProfile = async () => {
//   const response = await fetch(`${backendUrl}/doctor/profile`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
//     },
//   });
//   return handleResponse(response);
// };
// export const getDoctorById = async (doctorId) => {
//   const response = await fetch(`${backendUrl}/doctor/${doctorId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
//     },
//   });
//   return handleResponse(response);
// };

// doctorApi.js
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
import { handleResponse } from "../context/HelperHandleResponse";
export const registerDoctor = async (formData) => {
  const response = await fetch(`${backendUrl}/doctor/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const loginDoctor = async (email) => {
  const response = await fetch(`${backendUrl}/doctor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const verifyRegisterDoctorOtp = async (email, otp) => {
  const response = await fetch(`${backendUrl}/doctor/verify-register-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};

export const verifyLoginDoctorOtp = async (email, otp) => {
  const response = await fetch(`${backendUrl}/doctor/verify-login-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(response);
};

export const resendDoctorOtp = async (email, isRegister) => {
  const endpoint = isRegister ? "/doctor/resend-otp" : "/doctor/resend-otp";
  const response = await fetch(`${backendUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};