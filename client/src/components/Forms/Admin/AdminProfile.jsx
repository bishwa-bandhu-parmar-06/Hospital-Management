import React, { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";
import defaultprofile from "../../../assets/FormImage.png";
import EditProfileModal from "../Admin/AdminProfileUpdationForm";
import PendingRequest from "./AdminApprovalDashboard";
import { toast } from "react-toastify";
import AllDoctors from "../Doctors/AllDoctors";
import { FaPencilAlt } from "react-icons/fa";
import AllHospitals from "../Hospitals/AllHospitals";
import axios from "axios";

const AdminProfile = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";

  // State to manage the admin profile data
  const [admin, setAdmin] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeComponent, setActiveComponent] = useState("doctors");
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [profilePreview, setProfilePreview] = useState(defaultprofile);
  const [bannerPreview, setBannerPreview] = useState(
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  );

  // function to handle component change
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfileData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${backendUrl}/admin/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAdmin(data.admin);
          if (data.admin.profilePhoto) {
            setProfilePreview(data.admin.profilePhoto);
          }
          if (data.admin.bannerImage) {
            setBannerPreview(data.admin.bannerImage);
          }
        } else {
          console.error("Error fetching admin profile: ", data.message);
        }
      } catch (error) {
        console.error("Error Fetching Admin Profile: ", error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${backendUrl}/admin/approvals/pending`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPendingDoctors(data.pendingDoctors || []);
          setPendingHospitals(data.pendingHospitals || []);
        }
      } catch (error) {
        console.error("Error Fetching Pending Requests:", error);
      }
    };

    fetchAdminProfileData();
    fetchPendingRequests();
  }, [backendUrl]);

  const profileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

const handleFileChange = async (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append(type, file); // Append only the file being updated
  
  // Include current admin data for other fields
  formData.append('name', admin.name);
  formData.append('email', admin.email);
  formData.append('mobile', admin.mobile || '');

  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.put(`${backendUrl}/admin/update-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedAdmin = response.data.admin;
    setAdmin(updatedAdmin);
    
    // Update the correct preview based on what was changed
    if (type === 'profilePhoto') {
      setProfilePreview(updatedAdmin.profilePhoto);
      toast.success("Profile photo updated successfully");
    } else if (type === 'bannerImage') {
      setBannerPreview(updatedAdmin.bannerImage);
      toast.success("Banner image updated successfully");
    }

  } catch (err) {
    console.error('Image upload failed:', err);
    toast.error(err.response?.data?.message || "Failed to update image");
  }
};
const handleTextUpdate = async (formData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await fetch(`${backendUrl}/admin/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setAdmin(data.admin);
      toast.success("Profile updated successfully");
    } else {
      toast.error(data.message || "Error updating profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Something went wrong. Please try again.");
  }
};
  // Function to handle form updation
  const handleAdminUpdationForm = async (formData) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${backendUrl}/admin/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAdmin(data.admin);
        setShowEditForm(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Error updating admin profile");
      }
    } catch (error) {
      console.error("Error updating admin profile:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Function to handle Logout profile
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("adminToken");
        setAdmin(null);
        toast.success("Logout successful");
        window.location.href = "/auth";
      } else {
        console.error("Error logging out: ", data.message);
      }
    } catch (error) {
      console.error("Error Logging Out: ", error);
    }
  };

  // Function to handle Delete Account
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/admin/delete-admin`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("adminToken");
        setAdmin(null);
        toast.success("Account Deleted Successfully");
        window.location.href = "/auth";
      } else {
        console.error("Error Deleting Account: ", data.message);
        toast.error("Error Deleting Account");
      }
    } catch (error) {
      console.error("Error Deleting Account: ", error);
      toast.error("Error Deleting Account");
    }
  };

  if (!admin) {
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
          className="w-full h-48 md:h-56 object-cover"
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
              alt="Admin"
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
              onChange={(e) => handleFileChange(e, "profilePhoto")}
            />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-20 px-4 md:px-20 pb-6">
        {/* Name and Basic Info */}
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 uppercase">
            {admin.name}
          </h1>
          <p className="text-gray-600">{admin.role}</p>
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
              <span className="text-gray-700">{admin.email}</span>
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
                {admin.mobile || "Not provided"}
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
                {admin.createdAt
                  ? new Date(admin.createdAt).toLocaleDateString()
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">{admin.role}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => handleComponentChange("doctors")}
            className="px-3 py-2 md:px-4 md:py-2 border bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            Approve Doctor
          </button>
          <button
            onClick={() => handleComponentChange("hospitals")}
            className="px-3 py-2 md:px-4 md:py-2 border bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base"
          >
            Approve Hospital
          </button>
          <button
            onClick={() => handleComponentChange("pending")}
            className="px-3 py-2 md:px-4 md:py-2 border bg-secondary text-white rounded-md hover:bg-primary transition text-sm md:text-base relative"
          >
            Pending Requests
            {pendingDoctors.length + pendingHospitals.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                {pendingDoctors.length + pendingHospitals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowEditForm(true)}
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

      {/* Modal for Pending Requests */}
      {activeComponent === "pending" && (
        <PendingRequest
          onClose={() => setActiveComponent("")}
          pendingDoctors={pendingDoctors}
          pendingHospitals={pendingHospitals}
          setPendingDoctors={setPendingDoctors}
          setPendingHospitals={setPendingHospitals}
        />
      )}

      {/* show all doctors here */}
      {activeComponent === "doctors" && (
        <AllDoctors admin={admin} onClose={() => setActiveComponent("")} />
      )}
      {/* show all hospitals here */}
      {activeComponent === "hospitals" && (
        <AllHospitals admin={admin} onClose={() => setActiveComponent("")} />
      )}

      {/* Edit Profile Modal */}
      {showEditForm && (
        <EditProfileModal
          admin={admin}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleAdminUpdationForm}
        />
      )}
    </div>
  );
};

export default AdminProfile;
