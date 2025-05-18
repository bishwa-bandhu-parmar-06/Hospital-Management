import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';

const DoctorProfileForm = ({ doctor, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    profilePhoto: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        email: doctor.email || '',
        mobile: doctor.mobile || '',
        profilePhoto: doctor.profilePhoto || ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'var(--color-secondary)', textAlign: 'center' }}>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> 
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            disabled
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              mt: 2,
              bgcolor: 'var(--color-primary)',
              '&:hover': { bgcolor: 'var(--color-secondary)' }
            }}
          >
            Update Profile
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default DoctorProfileForm;