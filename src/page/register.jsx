import { Box, Typography, TextField, Button, Paper, InputAdornment, IconButton, Divider, Alert } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', form);
      const token = res.data.token || (res.data.data && res.data.data.token);
      if (token) {
        setSuccess('Registration successful! Redirecting...');
        localStorage.setItem('token', token);
        if (res.data.user) localStorage.setItem('user', JSON.stringify(res.data.user));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setError(res.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#23275c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
    }}>
      <Paper elevation={8} sx={{
        p: { xs: 3, sm: 5 }, borderRadius: 5, maxWidth: 410, width: '100%', mx: 'auto',
        bgcolor: '#282c6d', textAlign: 'center',
      }}>
        <Typography variant='h5' sx={{ color: "#fff", fontWeight: 500, fontSize: 24, mb: 1 }}>
          Create Account
        </Typography>
        <Typography variant='body1' sx={{ color: "#b8c0e0", mb: 3, fontSize: 15 }}>
          Sign up to start tracking your projects and issues.
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleRegister} autoComplete="off">
          <TextField
            fullWidth  name="name" value={form.name} onChange={handleChange} required placeholder='Enter your name'
            sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon sx={{ color: "#6c6fed" }} />
                </InputAdornment>
              ),
              style: { color: "#23275c", fontWeight: 500 }
            }}
            InputLabelProps={{
              style: { color: "#23275c", fontWeight: 600 }
            }}
          />
          <TextField
            fullWidth name="email" type="email" value={form.email} onChange={handleChange} required placeholder='Enter your email  '
            sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon sx={{ color: "#6c6fed" }} />
                </InputAdornment>
              ),
              style: { color: "#23275c", fontWeight: 500 }
            }}
            InputLabelProps={{
              style: { color: "#23275c", fontWeight: 600 }
            }}
          />
          <TextField
            fullWidth  name="password" type={showPassword ? "text" : "password"}
            value={form.password} onChange={handleChange} required placeholder='Enter your password'
            sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ color: "#6c6fed" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { color: "#23275c", fontWeight: 500 }
            }}
            InputLabelProps={{
              style: { color: "#23275c", fontWeight: 600 }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2,
              fontWeight: 500,
              fontSize: 15,
              borderRadius: 2,
              bgcolor: "#6c6fed",
              letterSpacing: 0.12,
              mt: 1,
              "&:hover": { bgcolor: "#232866" }
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <Divider sx={{ my: 3, bgcolor: "#2e3180" }} />
        <Typography sx={{ color: "#b8c0e0", fontSize: 14 }}>
          Already have an account?{" "}
          <Button
            href="/login"
            variant="text"
            size="small"
            sx={{
              color: "#6c6fed",
              fontWeight: 500,
              textTransform: "none",
              fontSize: 14,
              ml: 0.2,
              "&:hover": { color: "#f7b500" }
            }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;