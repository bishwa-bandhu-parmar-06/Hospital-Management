import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authImage from "../assets/FormImage.png";
// Patient components
import PatientRegisterForm from "../components/Forms/Patients/RegisterForm";
import PatientLoginForm from "../components/Forms/Patients/LoginForm";

// Doctor components
import DoctorRegisterForm from "../components/Forms/Doctors/DoctorRegistrationForm";
import DoctorLoginForm from "../components/Forms/Doctors/DoctorLoginForm";

// Admin components
import AdminLoginForm from "../components/Forms/Admin/AdminLoginForm";

// Hospital components
import HospitalRegisterForm from "../components/Forms/Hospitals/HospitalRegisterForm";
import HospitalLoginForm from "../components/Forms/Hospitals/HospitalLoginForm";

// Common components
import VerifyOtpForm from "../components/Forms/Common/VerifyOtpForm";

// API functions
import {
  registerPatient,
  loginPatient,
  verifyRegisterOtp,
  verifyLoginOtp,
  resendOtp as resendPatientOtp,
} from "../context/PatientApi";
import {
  registerDoctor,
  loginDoctor,
  verifyRegisterDoctorOtp,
  verifyLoginDoctorOtp,
  resendDoctorOtp,
} from "../context/doctorApi";
import {
  loginAdmin,
  verifyAdminLoginOtp,
  resendAdminOtp,
} from "../context/adminApi";
import {
  registerHospital,
  loginHospital,
  verifyRegisterHospitalOtp,
  verifyLoginHospitalOtp,
  resendHospitalOtp,
} from "../context/hospitalApi";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const [currentForm, setCurrentForm] = useState("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    setCurrentForm("login");
    setIsRegister(false);
  };

  // Patient handlers
  const handlePatientLogin = async (email) => {
    setLoading(true);
    try {
      const response = await loginPatient(email);
      if (response.message === "OTP sent to your email") {
        setEmail(email);
        setCurrentForm("verifyOtp");
        setIsRegister(false);
        toast.success("OTP sent to your email");
      } else {
        console.error("Unexpected response:", response);
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientRegister = async (formData) => {
    setLoading(true);
    try {
      await registerPatient(formData);
      setEmail(formData.email);
      setCurrentForm("verifyOtp");
      setIsRegister(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      if (isRegister) {
        await verifyRegisterOtp(email, otp);
        setCurrentForm("login");
        setIsRegister(false);
        toast.success("Registration successful. Please login.");
      } else {
        const response = await verifyLoginOtp(email, otp);
        if (response.token) {
          localStorage.setItem("patientToken", response.token);
          localStorage.setItem("userType", "patient");
          toast.success("Login successful");
          navigate("/patient/dashboard");
        } else {
          setError("Login failed. Please try again.");
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientResendOtp = async () => {
    setLoading(true);
    try {
      await resendPatientOtp(email, isRegister);
      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Doctor handlers
  const handleDoctorLogin = async (email) => {
    setLoading(true);
    try {
      const response = await loginDoctor(email);
      if (response.message === "OTP sent to your email") {
        setEmail(email);
        setCurrentForm("verifyOtp");
        setIsRegister(false);
        toast.success("OTP sent to your email");
      } else {
        console.error("Unexpected response:", response);
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Doctor login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorRegister = async (formData) => {
    setLoading(true);
    try {
      await registerDoctor(formData);
      setEmail(formData.email);
      setCurrentForm("verifyOtp");
      setIsRegister(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Doctor registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      if (isRegister) {
        await verifyRegisterDoctorOtp(email, otp);
        setCurrentForm("login");
        setIsRegister(false);
        toast.success("Registration successful. Please login.");
      } else {
        const response = await verifyLoginDoctorOtp(email, otp);
        if (response.doctor?.isApproved) {
          localStorage.setItem("doctorToken", response.token);
          localStorage.setItem("userType", "doctor");
          toast.success("Login successful");
          navigate("/doctor/dashboard");
        } else {
          toast.error("Account pending approval");
          navigate("/pending-approval", {
            state: {
              userType: "doctor",
              name: response.doctor?.name || "Doctor",
              email: email,
            },
          });
        }
      }
    } catch (error) {
      console.error("Doctor OTP verification error:", error);
      setError(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorResendOtp = async () => {
    setLoading(true);
    try {
      await resendDoctorOtp(email, isRegister);
      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Doctor resend OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hospital handlers
  const handleHospitalLogin = async (email) => {
    setLoading(true);
    try {
      const response = await loginHospital(email);
      if (response.message === "OTP sent to your email") {
        setEmail(email);
        setCurrentForm("verifyOtp");
        setIsRegister(false);
        toast.success("OTP sent to your email");
      } else {
        console.error("Unexpected response:", response);
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Hospital login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Updated hospital register handler with better error handling
  const handleHospitalRegister = async (formData) => {
    setLoading(true);
    setError("");
    try {
      // Validate mobile number before sending to API
      if (formData.mobile && formData.mobile.startsWith("0")) {
        throw new Error(
          "Mobile number should not start with 0. Please enter a valid phone number."
        );
      }

      const response = await registerHospital(formData);
      if (response.message === "OTP sent to your email") {
        setEmail(formData.email);
        setCurrentForm("verifyOtp");
        setIsRegister(true);
        toast.success("OTP sent to your email");
      } else {
        console.error("Unexpected response:", response);
        toast.error("Unexpected response from server");
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Detailed registration error:", error);
      let errorMsg = "Registration failed. Please try again.";

      if (
        error.message.includes("phone number") ||
        error.message.includes("mobile")
      ) {
        errorMsg = error.message;
      } else if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        if (error.response.status === 400) {
          errorMsg = error.response.data.message || "Invalid registration data";
        }
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const handleHospitalVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      if (isRegister) {
        await verifyRegisterHospitalOtp(email, otp);
        setCurrentForm("login");
        setIsRegister(false);
        toast.success("Registration successful. Please login.");
      } else {
        const response = await verifyLoginHospitalOtp(email, otp);
        if (response.hospital?.isApproved) {
          localStorage.setItem("hospitalToken", response.token);
          localStorage.setItem("userType", "hospital");
          toast.success("Login successful");
          navigate("/hospital/dashboard");
        } else {
          toast.error("Account pending approval");
          navigate("/pending-approval", {
            state: {
              userType: "hospital",
              name: response.hospital?.name || "Hospital",
              email: email,
            },
          });
        }
      }
    } catch (error) {
      console.error("Hospital OTP verification error:", error);
      setError(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalResendOtp = async () => {
    setLoading(true);
    try {
      await resendHospitalOtp(email, isRegister);
      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Hospital resend OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Admin handlers
  const handleAdminLogin = async (email) => {
    setLoading(true);
    try {
      await loginAdmin(email);
      setEmail(email);
      setCurrentForm("verifyOtp");
      setIsRegister(false);
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Admin login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await verifyAdminLoginOtp(email, otp);
      if (response.token) {
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("userType", "admin");
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        setError("Admin login failed. Please try again.");
      }
    } catch (error) {
      console.error("Admin OTP verification error:", error);
      setError(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminResendOtp = async () => {
    setLoading(true);
    try {
      await resendAdminOtp(email, false);
      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Admin resend OTP error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "register" : "login");
    if (activeTab === "admin") {
      setCurrentForm("login");
    }
  };

  useEffect(() => {
    setCurrentForm("login");
    setIsRegister(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-accentlight">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-secondary mb-12">
          Welcome to Aatura
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left side - Image */}
          <div className="hidden lg:block flex-auto max-w-2xl">
            <img
              src={authImage}
              alt="Authentication"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right side - Forms */}
          <div className="w-full lg:w-1/2 max-w-md  rounded-lg p-6">
            <div className="flex border-b  mb-4">
              <button
                onClick={() => handleTabChange("patient")}
                className={`flex-1 py-2 px-4 font-medium ${
                  activeTab === "patient"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700"
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => handleTabChange("doctor")}
                className={`flex-1 py-2 px-4 font-medium ${
                  activeTab === "doctor"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700"
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => handleTabChange("hospital")}
                className={`flex-1 py-2 px-4 font-medium ${
                  activeTab === "hospital"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700"
                }`}
              >
                Hospital
              </button>
              <button
                onClick={() => handleTabChange("admin")}
                className={`flex-1 py-2 px-4 font-medium ${
                  activeTab === "admin"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700"
                }`}
              >
                Admin
              </button>
            </div>

            {currentForm === "verifyOtp" ? (
              <VerifyOtpForm
                onSubmit={
                  activeTab === "patient"
                    ? handlePatientVerifyOtp
                    : activeTab === "doctor"
                    ? handleDoctorVerifyOtp
                    : activeTab === "hospital"
                    ? handleHospitalVerifyOtp
                    : handleAdminVerifyOtp
                }
                onResend={
                  activeTab === "patient"
                    ? handlePatientResendOtp
                    : activeTab === "doctor"
                    ? handleDoctorResendOtp
                    : activeTab === "hospital"
                    ? handleHospitalResendOtp
                    : handleAdminResendOtp
                }
                email={email}
                isRegister={isRegister}
                loading={loading}
              />
            ) : (
              <>
                {activeTab === "patient" &&
                  (currentForm === "login" ? (
                    <PatientLoginForm
                      onSubmit={handlePatientLogin}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ) : (
                    <PatientRegisterForm
                      onSubmit={handlePatientRegister}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ))}

                {activeTab === "doctor" &&
                  (currentForm === "login" ? (
                    <DoctorLoginForm
                      onSubmit={handleDoctorLogin}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ) : (
                    <DoctorRegisterForm
                      onSubmit={handleDoctorRegister}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ))}

                {activeTab === "hospital" &&
                  (currentForm === "login" ? (
                    <HospitalLoginForm
                      onSubmit={handleHospitalLogin}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ) : (
                    <HospitalRegisterForm
                      onSubmit={handleHospitalRegister}
                      onToggleForm={toggleForm}
                      loading={loading}
                    />
                  ))}

                {activeTab === "admin" && (
                  <AdminLoginForm
                    onSubmit={handleAdminLogin}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
