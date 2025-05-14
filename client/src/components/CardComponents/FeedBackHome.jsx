// File: FeedBackHome.jsx
// Description: This component fetches and displays feedback from patients, allowing users to navigate through the feedback using arrows or dots.
import React, { useState, useEffect } from 'react';
import { getFeedbacks } from '../../utils/feedbackApi'; // Adjust the import path as needed

const FeedBackHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getFeedbacks();
        setFeedbacks(response.data); // Adjusted to match your API response structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const nextFeedback = () => {
    setCurrentFeedback((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  const prevFeedback = () => {
    setCurrentFeedback((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="py-16 bg-accentlight text-center">
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-accentlight text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="py-16 bg-accentlight text-center">
        <p>No feedback available yet.</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-16 bg-accentlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">What Our Patients Say About Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Feedback Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              {renderStars(5)}
            </div>
            <blockquote className="text-lg text-textPrimary italic mb-6">
              "{feedbacks[currentFeedback].feedback}"
            </blockquote>
            <div className="text-secondary font-semibold">
              {feedbacks[currentFeedback].name}
            </div>
            <div className="text-gray-600 text-sm mb-2">
              {feedbacks[currentFeedback].userType}
            </div>
            <div className="text-gray-500 text-xs">
              {formatDate(feedbacks[currentFeedback].createdAt)}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevFeedback}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Previous feedback"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextFeedback}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Next feedback"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeedback(index)}
                className={`w-3 h-3 rounded-full ${currentFeedback === index ? 'bg-secondary' : 'bg-accent'}`}
                aria-label={`Go to feedback ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackHome;