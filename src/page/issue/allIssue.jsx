import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  Chip,
  Alert,
  Button
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllIssue() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .get("http://localhost:4000/api/issue", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Handle both array and {issues: [...]} API responses
        
        if (Array.isArray(res.data)) {
          setIssues(res.data);
        } else if (Array.isArray(res.data.issues)) {
          setIssues(res.data.issues);
        } else {
          setIssues([]);
        }
      })
      .catch((err) =>
        setError(
          err.response?.data?.message ||
          err.message ||
          "Error fetching issues"
        )
      )
      .finally(() => setLoading(false));
  }, [token]);

  
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


  function getDisplayName(userOrId) {
    if (!userOrId) return "Unknown";
    if (typeof userOrId === "object") {
      return userOrId.name || userOrId.fullName || userOrId.username || userOrId.email || userOrId._id || "Unknown";
    }
    return userOrId;
  }

  function getProjectTitle(projectOrId) {
    if (!projectOrId) return "Unknown";
    if (typeof projectOrId === "object") {
      return projectOrId.title || projectOrId.name || projectOrId._id || "Unknown";
    }
    return projectOrId;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", pt: 7, px: 2 }}>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 , marginRight:'30px' }}>
        <Button
             onClick={() => navigate("/issue/myIssue")}
          variant="contained"
          sx={{
            bgcolor: "#6c6fed",
            color: "#fff",
            "&:hover": { bgcolor: "#5a5adf" },
            borderRadius:'15px',
          }}
        >
          MY ISSUE
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
            All Issues
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!issues.length ? (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography color="text.secondary" sx={{ fontSize: 22, mt: 2 }}>
              No issues found.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {issues.map(
              ({
                _id,
                title,
                description,
                status = "",
                priority = "",
                projectId,
                assignedTo,
                createdAt,
              }) => (
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
                      sx={{ flexGrow: 1, letterSpacing: 0.5, fontSize: 19 }}
                    >
                      {title}
                    </Typography>
                    {status && (
                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          bgcolor:
                            status.toLowerCase() === "open"
                              ? "#e6f7ee"
                              : status.toLowerCase() === "in progress"
                              ? "#fff7ed"
                              : status.toLowerCase() === "closed"
                              ? "#ececec"
                              : "#e0e3ea",
                          color:
                            status.toLowerCase() === "open"
                              ? "#43bfa0"
                              : status.toLowerCase() === "in progress"
                              ? "#f78c6c"
                              : status.toLowerCase() === "closed"
                              ? "#9e9e9e"
                              : "#23275c",
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
                          bgcolor:
                            ["high", "critical"].includes(
                              priority.toLowerCase()
                            )
                              ? "#fef2f2"
                              : priority.toLowerCase() === "medium"
                              ? "#fff7ed"
                              : "#f0fdf4",
                          color:
                            ["high", "critical"].includes(
                              priority.toLowerCase()
                            )
                              ? "#ef4444"
                              : priority.toLowerCase() === "medium"
                              ? "#f78c6c"
                              : "#43bfa0",
                          fontWeight: 500,
                          borderRadius: 1,
                        }}
                      />
                    )}
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
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        <b>Project:</b> {getProjectTitle(projectId)}
                      </Typography>
                    )}
                    {assignedTo && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        <b>Created By:</b> {getDisplayName(assignedTo)}
                      </Typography>
                    )}
                  </Stack>
                  {createdAt && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      Created: {new Date(createdAt).toLocaleString()}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    Issue ID: {_id}
                  </Typography>
                </Paper>
              )
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default AllIssue;