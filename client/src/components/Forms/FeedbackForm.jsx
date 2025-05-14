
import React from "react";
import { FaTimes } from "react-icons/fa";
import { sendFeedback } from "../../utils/feedbackApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = ({ onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    feedback: "",
    rating: 5,
    userType: "patient",
    patientDepartment: "cardiology",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendFeedback(formData);
      toast.success("Feedback submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({
        name: "",
        email: "",
        feedback: "",
        rating: 5,
        userType: "patient",
        patientDepartment: "cardiology",
      });
      onClose();
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.error("Failed to submit feedback. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => handleRatingChange(star)}
        className={`text-2xl ${
          star <= formData.rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-accentlight p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-primary)] hover:text-[var(--color-error)] transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
          Give Us Feedback
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Your Rating
            </label>
            <div className="flex justify-center space-x-1">{renderStars()}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              You are a:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["patient", "doctor", "visitor"].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 text-black"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={formData.userType === type}
                    onChange={handleChange}
                    className="text-black"
                    disabled={isSubmitting}
                  />
                  <span className="capitalize text-black">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.userType === "patient" && (
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Department
              </label>
              <select
                name="patientDepartment"
                value={formData.patientDepartment}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-black"
                disabled={isSubmitting}
              >
                {[
                  "cardiology",
                  "orthopedics",
                  "neurology",
                  "pediatrics",
                  "other",
                ].map((dept) => (
                  <option
                    key={dept}
                    value={dept}
                    className="capitalize text-black"
                  >
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)]"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[var(--color-primary)] text-white py-2 rounded hover:bg-[var(--color-secondary)] transition-colors duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
