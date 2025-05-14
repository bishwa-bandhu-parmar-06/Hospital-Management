import api from './axiosConfig';

export const sendFeedback = async (formData) => {
  try {
    const response = await api.post('/feedback/give-feedback', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// In your axiosConfig.js or api service file
export const getFeedbacks = async () => {
  try {
    const response = await api.get('/feedback/get-feedback');
    return response.data;
  } catch (error) {
    throw error;
  }
};