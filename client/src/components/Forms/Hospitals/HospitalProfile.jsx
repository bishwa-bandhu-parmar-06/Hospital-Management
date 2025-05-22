import React, { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";
import defaultprofile from "../../../assets/FormImage.png";
import EditProfileModal from "./HospitalUpdateForm";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";

// import AllDoctors from "./AllDoctors";
import HospitalsDoctors from "./HospitalsDoctors";
import PendingHospitalsAppoinments from "./PendingHospitalsAppoinments";
import HospitalsAppointment from "./HospitalsAppointment";
import { useNavigate } from "react-router-dom";
const HospitalProfile = () => {
  const backendUrl =import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState("hospitalsDoctors");
  const [hospital, setHospital] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [profilePreview, setProfilePreview] = useState(defaultprofile);
  const [bannerPreview, setBannerPreview] = useState(
    "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  );

  const profileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // function to handle component change
  const handleComponentChange = (component) => {
    if (activeComponent === component) {
      setActiveComponent(null);
    } else {
      setActiveComponent(component);
    }
  };

  useEffect(() => {
    const fetchHospitalProfileData = async () => {
      try {
        const token = localStorage.getItem("hospitalToken");
        const response = await fetch(`${backendUrl}/hospital/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setHospital(data.hospital);
          if (data.hospital.logo) {
            setProfilePreview(data.hospital.logo);
          }
          if (data.hospital.bannerImage) {
            setBannerPreview(data.hospital.bannerImage);
          }
        } else {
          console.error("Error fetching hospital profile: ", data.message);
        }
      } catch (error) {
        console.error("Error Fetching Hospital Profile: ", error);
      }
    };

    fetchHospitalProfileData();
  }, [backendUrl]);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);
    formData.append("name", hospital.name);
    formData.append("email", hospital.email);
    formData.append("mobile", hospital.mobile || "");
    formData.append("address", hospital.address || "");

    try {
      const token = localStorage.getItem("hospitalToken");
      const response = await axios.put(
        `${backendUrl}/hospital/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedHospital = response.data.hospital;
      setHospital(updatedHospital);

      if (type === "logo") {
        setProfilePreview(updatedHospital.logo);
        toast.success("Logo updated successfully");
      } else if (type === "bannerImage") {
        setBannerPreview(updatedHospital.bannerImage);
        toast.success("Banner image updated successfully");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error(err.response?.data?.message || "Failed to update image");
    }
  };

  const handleHospitalUpdationForm = async (formData) => {
    try {
      const token = localStorage.getItem("hospitalToken");
      const response = await fetch(`${backendUrl}/hospital/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setHospital(data.hospital);
        setShowEditForm(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Error updating hospital profile");
      }
    } catch (error) {
      console.error("Error updating hospital profile:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("hospitalToken");
      const response = await fetch(`${backendUrl}/hospital/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("hospitalToken");
        setHospital(null);
        toast.success("Logout successful");
        navigate("/auth");
      } else {
        console.error("Error logging out: ", data.message);
      }
    } catch (error) {
      console.error("Error Logging Out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("hospitalToken");
      const response = await fetch(`${backendUrl}/hospital/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("hospitalToken");
        setHospital(null);
        toast.success("Account Deleted Successfully");
        navigate("/auth");
      } else {
        console.error("Error Deleting Account: ", data.message);
        toast.error("Error Deleting Account");
      }
    } catch (error) {
      console.error("Error Deleting Account: ", error);
      toast.error("Error Deleting Account");
    }
  };

  if (!hospital) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-accentlight min-h-screen">
      {/* Banner Image */}
      <div className="relative">
        <img
          src={bannerPreview}
          alt="Banner"
          className="w-full h-64 md:h-56 object-cover"
        />
        <button
          onClick={() => bannerInputRef.current.click()}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaPencilAlt className="text-gray-600" />
        </button>
        <input
          ref={bannerInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "bannerImage")}
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-4 md:left-16">
          <div className="relative">
            <img
              src={profilePreview}
              alt="Hospital"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-secondary shadow-lg object-cover"
            />
            <button
              onClick={() => profileInputRef.current.click()}
              className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
            >
              <FaPencilAlt className="text-gray-600 text-sm" />
            </button>
            <input
              ref={profileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
            />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-20 px-4 md:px-20 pb-6">
        {/* Name and Basic Info */}
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 uppercase">
            {hospital.name}
          </h1>
          <p className="text-gray-600">{hospital.address || "Hospital"}</p>
          {hospital.verified && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md ml-2">
              Verified
            </span>
          )}
        </div>

        {/* Stats/Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">{hospital.email}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-700">
                {hospital.mobile || "Not provided"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">
                Joined{" "}
                {hospital.createdAt
                  ? new Date(hospital.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700">
                {hospital.address || "Address not specified"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => handleComponentChange("hospitalsDoctors")}
            className="px-3 py-2 md:px-4 md:py-2 bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            All Doctors
          </button>
          <button
            onClick={() => handleComponentChange("hospitalsAppointment")}
            className="px-3 py-2 md:px-4 md:py-2 bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            All Appointments
          </button>
          <button
            onClick={() => handleComponentChange("pendinghospitalsAppointment")}
            className="px-3 py-2 md:px-4 md:py-2 bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            Pending Appointments
          </button>
          <button
            onClick={() => {
              setShowEditForm(true);
              handleComponentChange("editform");
            }}
            className="px-3 py-2 md:px-4 md:py-2 bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 md:px-4 md:py-2 border bg-secondary text-white rounded-md hover:bg-error transition text-sm md:text-base"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-3 py-2 md:px-4 md:py-2 border bg-secondary text-white rounded-md hover:bg-error transition text-sm md:text-base"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Conditional rendering of components */}
      {activeComponent === "hospitalsDoctors" && (
        <HospitalsDoctors hospital={hospital} />
      )}

      {activeComponent === "pendinghospitalsAppointment" && (
        <PendingHospitalsAppoinments hospital={hospital} />
      )}

      {activeComponent === "hospitalsAppointment" && (
        <HospitalsAppointment hospital={hospital} />
      )}

      {/* Edit Profile Modal */}
      {showEditForm && (
        <EditProfileModal
          hospital={hospital}
          onClose={() => {
            setShowEditForm(false);
            setActiveComponent(null);
          }}
          onSubmit={handleHospitalUpdationForm}
        />
      )}
    </div>
  );
};

export default HospitalProfile;
