import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HospitalProfileForm = ({ hospital, onSubmit, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        p: isMobile ? 2 : 4
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: isMobile ? 2 : 4, 
          width: '100%',
          maxWidth: 800,
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            color: 'var(--color-secondary)', 
            textAlign: 'center',
            pt: 1
          }}
        >
          Hospital Profile
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <label htmlFor="logo-upload">
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Avatar 
                  src={formData.logo} 
                  sx={{ 
                    width: isMobile ? 80 : 120, 
                    height: isMobile ? 80 : 120,
                    cursor: 'pointer'
                  }} 
                  variant="rounded"
                />
              </label>
            </Box>
            
            <TextField
              label="Hospital Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
            />
            
            <TextField
              disabled
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
            />
            
            <TextField
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
            />
            
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={isMobile ? 2 : 3}
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
            />
            
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              size={isMobile ? 'small' : 'medium'}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                mt: 2,
                bgcolor: 'var(--color-primary)',
                '&:hover': { bgcolor: 'var(--color-secondary)' },
                py: isMobile ? 1 : 1.5
              }}
              size={isMobile ? 'small' : 'medium'}
            >
              Update Profile
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default HospitalProfileForm;