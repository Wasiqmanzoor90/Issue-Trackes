import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  Chip,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyIssue() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const navigate = useNavigate();
  // Get user data once
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
console.log("Logged-in user:", user);
  const userId = user?.id;
console.log(userId,"ok ")
  // Delete issue by id and update state
const deleteIssue = async (id) => {
  if (!id) return;
  try {
    await axios.delete(`http://localhost:4000/api/issue/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Remove from UI without refetch
    setIssues((prev) => prev.filter((issue) => issue._id !== id));
  } catch (error) {
    setError("Failed to delete issue. Please try again.");
    console.log(error);
  }
};


  // Fetch issues with useCallback to prevent unnecessary re-renders
  const fetchIssues = useCallback(async () => {
    if (!token || !userId) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`http://localhost:4000/api/issue/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Simplified data handling
      const issuesData = res.data?.issues || res.data || [];
      setIssues(Array.isArray(issuesData) ? issuesData : []);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch issues. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Menu handlers
  const handleMenuClick = (event, issueId) => {
    setAnchorEl(event.currentTarget);
    setSelectedIssueId(issueId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIssueId(null);
  };

  // Update issue status
  const updateIssueStatus = async (status) => {
    if (!selectedIssueId || !userId) return;

    try {
      await axios.put(
        `http://localhost:4000/api/issue/${selectedIssueId}/${userId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state instead of refetching
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === selectedIssueId ? { ...issue, status } : issue
        )
      );

      handleMenuClose();
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update issue status. Please try again.");
    }
  };

  const statusOptions = ["Open", "In Progress", "Closed"];

  // Simplified helper functions
  const getDisplayName = (userOrId) => {
    if (!userOrId) return "Unknown";
    if (typeof userOrId === "object") {
      return (
        userOrId.name ||
        userOrId.fullName ||
        userOrId.username ||
        userOrId.email ||
        "Unknown"
      );
    }
    return userOrId;
  };

  const getProjectTitle = (projectOrId) => {
    if (!projectOrId) return "Unknown";
    if (typeof projectOrId === "object") {
      return projectOrId.title || projectOrId.name || "Unknown";
    }
    return projectOrId;
  };

  // Status chip styling
  const getStatusChipStyle = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "open":
        return { bgcolor: "#e6f7ee", color: "#43bfa0" };
      case "in progress":
        return { bgcolor: "#fff7ed", color: "#f78c6c" };
      case "closed":
        return { bgcolor: "#ececec", color: "#9e9e9e" };
      default:
        return { bgcolor: "#e0e3ea", color: "#23275c" };
    }
  };

  // Priority chip styling
  const getPriorityChipStyle = (priority) => {
    const priorityLower = priority.toLowerCase();
    if (["high", "critical"].includes(priorityLower)) {
      return { bgcolor: "#fef2f2", color: "#ef4444" };
    }
    if (priorityLower === "medium") {
      return { bgcolor: "#fff7ed", color: "#f78c6c" };
    }
    return { bgcolor: "#f0fdf4", color: "#43bfa0" };
  };

  if (loading) {
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
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", pt: 7, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          marginRight: "30px",
        }}
      >
        <Button
          onClick={() => navigate("/issues/create")}
          variant="contained"
          sx={{
            bgcolor: "#6c6fed",
            color: "#fff",
            "&:hover": { bgcolor: "#5a5adf" },
            borderRadius: "15px",
          }}
        >
          + CREATE ISSUE
        </Button>
      </Box>

      <Box
        sx={{
          maxWidth: 750,
          mx: "auto",
          borderRadius: 4,
          p: { xs: 2.5, sm: 5 },
          boxShadow: 4,
          background: "#fff",
          border: "1.5px solid #ececec",
        }}
      >
        <Stack direction="row" alignItems="center" gap={2} mb={3}>
          <BugReportIcon sx={{ color: "#f78c6c", fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#23275c" }}>
            My Issues
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {issues.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography color="text.secondary" sx={{ fontSize: 22, mt: 2 }}>
              No issues found.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {issues.map((issue) => {
              const {
                _id,
                title,
                description,
                status = "",
                priority = "",
                projectId,
                assignedTo,
                createdAt,
              } = issue;

              return (
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
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#23275c"
                      sx={{ flexGrow: 1, fontSize: 19 }}
                    >
                      {title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, _id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        aria-label="delete"
                        color="error"
                    onClick={() => deleteIssue(_id)}

                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Typography
                    color="text.secondary"
                    sx={{ minHeight: 36, fontSize: 16, mb: 1 }}
                  >
                    {description || (
                      <span style={{ color: "#bdbdbd" }}>
                        No description provided.
                      </span>
                    )}
                  </Typography>

                  <Stack direction="row" spacing={2} mb={1}>
                    {projectId && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Project:</strong> {getProjectTitle(projectId)}
                      </Typography>
                    )}
                    {assignedTo && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Created By:</strong>{" "}
                        {getDisplayName(assignedTo)}
                      </Typography>
                    )}
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    Created: {new Date(createdAt).toLocaleString()}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1}>
                    {status && (
                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          ...getStatusChipStyle(status),
                          fontWeight: 700,
                          borderRadius: 1,
                        }}
                      />
                    )}
                    {priority && (
                      <Chip
                        label={priority}
                        size="small"
                        sx={{
                          ...getPriorityChipStyle(priority),
                          fontWeight: 500,
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Box>

      {/* Menu positioned outside the map to avoid re-rendering issues */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {statusOptions.map((status) => (
          <MenuItem key={status} onClick={() => updateIssueStatus(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MyIssue;
