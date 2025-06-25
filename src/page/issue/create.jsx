import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function CreateIssue() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = React.useMemo(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : {};
    } catch {
      return {};
    }
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    status: 'Open',
    priority: 'Medium'
  });

  const priorityOptions = [
    { value: 'Low', color: '#43bfa0', bgColor: '#f0fdf4' },
    { value: 'Medium', color: '#f78c6c', bgColor: '#fff7ed' },
    { value: 'High', color: '#ef4444', bgColor: '#fef2f2' },
  ];

  const statusOptions = [
    { value: 'Open', color: '#22c55e' },
    { value: 'In Progress', color: '#3b82f6' },
    { value: 'Closed', color: '#6b7280' }
  ];

  // Fetch projects for dropdown
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please login again.');
      return;
    }
    axios.get('http://localhost:4000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProjects(res.data))
      .catch(() => setError('Error fetching projects'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please login again.');
      setLoading(false);
      return;
    }
    try {
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        projectId: formData.projectId || null,
        assignedTo: user?.id || null,
        priority: formData.priority,
        status: formData.status
      };
      await axios.post('http://localhost:4000/api/issue/', submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setSuccess('Issue created successfully!');
      setFormData({
        title: '',
        description: '',
        projectId: '',
        status: 'Open',
        priority: 'Medium'
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || 'Server error';
        if (status === 401) setError('Authentication failed. Please login again.');
        else if (status === 400) setError(`Validation error: ${message}`);
        else if (status === 500) setError(`Server error: ${message}`);
        else setError(`Error (${status}): ${message}`);
      } else if (error.request) {
        setError('Network error: Cannot connect to server. Please check if the server is running.');
      } else {
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f2f4fa",
      p: { xs: 2, md: 5 },
    }}>
      <Stack direction="row" alignItems="center" gap={2} mb={4}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{
            color: "#6c6fed",
            textTransform: "none",
            fontWeight: 500
          }}
        >
          Back to Dashboard
        </Button>
      </Stack>

      <Paper elevation={4} sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" gap={2} mb={3}>
          <BugReportIcon sx={{ color: "#f78c6c", fontSize: 32 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#23275c" }}>
              Create New Issue
            </Typography>
            <Typography color="#888ebc" fontSize={16}>
              Report a bug or request a feature
            </Typography>
          </Box>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Issue Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Brief description of the issue"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              placeholder="Detailed description of the issue, steps to reproduce, expected behavior..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Project (Optional)</InputLabel>
              <Select
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                label="Project (Optional)"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>No Project</em>
                </MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  label="Priority"
                  sx={{ borderRadius: 2 }}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Chip
                          label={option.value}
                          size="small"
                          sx={{
                            bgcolor: option.bgColor,
                            color: option.color,
                            fontWeight: 500
                          }}
                        />
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Status"
                  sx={{ borderRadius: 2 }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: option.color
                          }}
                        />
                        {option.value}
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ p: 2, bgcolor: '#f4f6fd', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Assigned To:
              </Typography>
              <Typography fontWeight={500}>
                {user?.name || 'Unknown User'} (You)
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                disabled={loading}
                sx={{
                  bgcolor: "#f78c6c",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  '&:hover': {
                    bgcolor: "#e67c5c"
                  },
                  '&:disabled': {
                    bgcolor: "#ccc"
                  }
                }}
              >
                {loading ? 'Creating...' : 'Create Issue'}
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                sx={{
                  borderColor: "#6c6fed",
                  color: "#6c6fed",
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none"
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateIssue;