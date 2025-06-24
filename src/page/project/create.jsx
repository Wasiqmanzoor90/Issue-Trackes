import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  InputAdornment,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:4000/api/projects",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f2f4fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 450,
          width: "100%",
          mx: "auto",
          bgcolor: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1} mb={2}>
          <AddCircleOutlineIcon sx={{ color: "#6c6fed", fontSize: 32 }} />
          <Typography variant="h5" fontWeight={600} color="#23275c">
            Create Project
          </Typography>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2, bgcolor: "#f8fafd", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFileRenameOutlineIcon sx={{ color: "#6c6fed" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3, bgcolor: "#f8fafd", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon sx={{ color: "#23275c" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              bgcolor: "#6c6fed",
              fontWeight: 600,
              fontSize: 16,
              py: 1.2,
              borderRadius: 2,
              letterSpacing: 0.1,
              "&:hover": { bgcolor: "#232866" },
            }}
          >
            Create Project
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Create;