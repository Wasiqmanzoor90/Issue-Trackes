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
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function MyProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
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

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:4000/api/projects/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== deleteId));
      setSnackbar({ open: true, message: "Project deleted successfully", severity: "success" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error deleting project",
        severity: "error",
      });
    }
    setDeleteId(null);
  };

  const handleEdit = (id) => {
    navigate(`/project/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/project/details/${id}`);
  };

  const handleAddProject = () => {
    navigate("/project/create");
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
      {/* Top Action Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, marginRight: '30px' }}>
        <Button
          onClick={handleAddProject}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#6c6fed",
            color: "#fff",
            "&:hover": { bgcolor: "#5a5adf" },
            borderRadius: "15px",
            fontWeight: 700
          }}
        >
          Add Project
        </Button>
      </Box>

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
            {projects.map(({ _id, title, description, status, createdAt, updatedAt }) => (
              <Paper
                key={_id}
                elevation={2}
                onClick={() => handleView(_id)}
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
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={e => { e.stopPropagation(); handleEdit(_id); }}
                      sx={{ ml: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={e => { e.stopPropagation(); setDeleteId(_id); }}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Typography
                  color="text.secondary"
                  sx={{ minHeight: 36, fontSize: 16, mb: 1.5 }}
                >
                  {description || (
                    <span style={{ color: "#bdbdbd" }}>
                      No description provided.
                    </span>
                  )}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Created: {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "-"}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for actions */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}

export default MyProject;