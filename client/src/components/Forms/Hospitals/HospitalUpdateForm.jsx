import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';

const HospitalProfileForm = ({ hospital, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    website: '',
    logo: ''
  });

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || '',
        email: hospital.email || '',
        mobile: hospital.mobile || '',
        address: hospital.address || '',
        website: hospital.website || '',
        logo: hospital.logo || ''
      });
    }
  }, [hospital]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'var(--color-secondary)', textAlign: 'center' }}>
        Hospital Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar 
              src={formData.logo} 
              sx={{ width: 120, height: 120 }} 
              variant="rounded"
            />
          </Box>
          <Button 
            variant="outlined" 
            component="label"
            sx={{ width: 'fit-content', mx: 'auto' }}
          >
            Upload Logo
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <TextField
            label="Hospital Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />
          <TextField
            label="Website"
            name="website"
            value={formData.website}
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

export default HospitalProfileForm;