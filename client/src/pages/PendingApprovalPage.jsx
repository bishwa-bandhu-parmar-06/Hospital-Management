import React from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const PendingApprovalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, name, email } = location.state || {
    userType: 'user',
    name: 'Guest',
    email: 'unknown@example.com'
  };

  const handleLogout = () => {
    // Clear any stored tokens
    localStorage.removeItem(`${userType}Token`);
    navigate('/auth');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--color-background)',
        p: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 4,
          borderRadius: 2,
          backgroundColor: 'white',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3
          }}
        >
          <CircularProgress 
            size={60} 
            sx={{ color: 'var(--color-primary)' }} 
          />
        </Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'var(--color-primary)',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          Account Pending Approval
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--color-text-primary)',
            mb: 3,
            fontSize: '1.1rem'
          }}
        >
          Hello, <span style={{ fontWeight: 'bold' }}>{name}</span>!
        </Typography>

        <Box
          sx={{
            backgroundColor: 'var(--color-accentlight)',
            p: 3,
            borderRadius: 1,
            mb: 3,
            borderLeft: '4px solid var(--color-secondary)'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'var(--color-text-primary)',
              mb: 2
            }}
          >
            Your {userType} account is currently under review by our administration team.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              color: 'var(--color-secondary)'
            }}
          >
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              We'll send a confirmation email to <strong>{email}</strong> once approved.
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'var(--color-text-primary)',
            mb: 3,
            fontStyle: 'italic'
          }}
        >
          Approval typically takes 24-48 hours. Thank you for your patience!
        </Typography>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: 'var(--color-primary)',
            '&:hover': { bgcolor: 'var(--color-secondary)' },
            px: 4,
            py: 1.5,
            mt: 2
          }}
        >
          Return to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default PendingApprovalPage;