import api from './axiosConfig';

export const sendContactMessage = async (formData) => {
  try {
    const response = await api.post('/contact/create-contact', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};