
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const DoctorCardSlider = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api/v1";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 > doctors.length - cardsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? doctors.length - cardsToShow : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch(`${backendUrl}/getAll/all-doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          const approvedDoctors = data.doctor.filter(
            (doctor) => doctor.status === "approved"
          );
          setDoctors(approvedDoctors);
        } else {
          toast.error(data.message || "Failed to fetch doctors");
          setDoctors([]);
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
        console.error("Fetch doctors error:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, [backendUrl]);

  if (loading) {
    return <Loader />;
  }

  if (doctors.length === 0) {
    return (
      <div className="py-16 bg-accentlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl text-textPrimary">
            No doctors available at the moment
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-accentlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Our Expert Doctors
          </h2>
          <p className="text-lg text-textPrimary max-w-2xl mx-auto">
            Meet our team of highly qualified medical professionals dedicated to
            your health and well-being.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          {doctors.length > cardsToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 z-10"
                aria-label="Previous doctors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 z-10"
                aria-label="Next doctors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full transition-transform duration-300">
            {doctors
              .slice(currentIndex, currentIndex + cardsToShow)
              .map((doctor) => (
                <div
                  key={doctor._id}
                  className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="relative h-48 bg-accent flex items-center justify-center">
                    {doctor.profilePhoto ? (
                      <img
                        src={doctor.profilePhoto}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">
                          {doctor.name?.charAt(0).toUpperCase() || "D"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h2 className="text-xl font-bold text-textPrimary leading-tight">
                            {doctor.name}
                          </h2>
                          <p className="text-primary font-medium text-sm mt-1">
                            {doctor.specialization || "General Practitioner"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-textPrimary opacity-90">
                          {doctor.designation || "Senior Doctor"}
                        </div>
                        <span className="text-xs bg-accent text-secondary px-3 py-1 rounded-full font-medium">
                          {doctor.experience || "0"} yrs experience
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-textPrimary">
                        <svg
                          className="w-4 h-4 mr-2 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{doctor.availability || "Mon-Fri"}</span>
                      </div>
                      <div className="flex items-center text-textPrimary">
                        <svg
                          className="w-4 h-4 mr-2 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{doctor.hospital}</span>
                      </div>
                      <div className="flex items-center text-textPrimary">
                        <svg
                          className="w-4 h-4 mr-2 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 010-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Room {doctor.roomNumber || "101"}</span>
                      </div>
                    </div>

                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition-colors duration-300 shadow-sm"
                    >
                      View Profile
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {doctors.length > cardsToShow && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: doctors.length - cardsToShow + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-primary w-6" : "bg-accent"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCardSlider;
