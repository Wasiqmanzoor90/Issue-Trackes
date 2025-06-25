import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function MyProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user?.id) return navigate("/login");
    axios
      .get("http://localhost:4000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userProjects = res.data.filter(
          (proj) => proj.createdBy?._id === user.id
        );
        setProjects(userProjects);
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Error fetching projects")
      )
      .finally(() => setLoading(false));
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting project");
    }
  };

  if (!token) return null;
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f7fa",
        }}
      >
        <CircularProgress size={54} thickness={5} color="primary" />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", pt: 7, px: 2 }}>
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          borderRadius: 4,
          p: { xs: 2.5, sm: 5 },
          boxShadow: 4,
          background: "#fff",
          border: "1.5px solid #ececec",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            textAlign: "center",
            mb: 4,
            letterSpacing: 1,
            color: "#23275c",
          }}
        >
          My Projects
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!projects.length ? (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <FolderOpenIcon sx={{ fontSize: 80, color: "#bdbdbd" }} />
            <Typography color="text.secondary" sx={{ fontSize: 22, mt: 2 }}>
              No projects found.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {projects.map(({ _id, title, description, status }) => (
              <Paper
                key={_id}
                elevation={1}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  background: "#f8fafd",
                  border: "1.2px solid #e0e3ea",
                  transition: "0.18s",
                  "&:hover": {
                    boxShadow: 4,
                    borderColor: "#6c6fed44",
                    background: "#f0f4ff",
                  },
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#23275c"
                    sx={{ flexGrow: 1, letterSpacing: 0.5, fontSize: 19 }}
                  >
                    {title}
                  </Typography>
                  {status && (
                    <Chip
                      label={status}
                      size="medium"
                      sx={{
                        bgcolor: "#e6e6ea",
                        color: "#23275c",
                        fontWeight: 700,
                        borderRadius: 1,
                        fontSize: 15,
                      }}
                    />
                  )}
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(_id)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <Typography
                  color="text.secondary"
                  sx={{ minHeight: 36, fontSize: 16 }}
                >
                  {description || (
                    <span style={{ color: "#bdbdbd" }}>
                      No description provided.
                    </span>
                  )}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default MyProject;