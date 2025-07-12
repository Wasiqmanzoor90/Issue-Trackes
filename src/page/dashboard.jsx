import React, { useEffect, useState } from "react";
import { isAuthorized } from "../../utils/isAuthorized";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Grid,
  Skeleton,
  Avatar,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import BugReportIcon from "@mui/icons-material/BugReport";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";

function Dashboard() {
  const [authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [projects, setProjects] = useState([]);
  const [issues, setIssues] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [displayedIssues, setDisplayedIssues] = useState([]);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [showMoreIssues, setShowMoreIssues] = useState(false);
  const navigate = useNavigate();

  const INITIAL_DISPLAY_COUNT = 3;

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const client = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch projects created by the user
  const fetchProjects = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get(`http://localhost:4000/api/projects/${client.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setProjects(data);
      setDisplayedProjects(data.slice(0, INITIAL_DISPLAY_COUNT));
      setShowMoreProjects(data.length > INITIAL_DISPLAY_COUNT);
    } catch (error) {
      setProjects([]);
      setDisplayedProjects([]);
      setShowMoreProjects(false);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch all issues
  const fetchIssues = async () => {
    try {
      const token = getAuthToken();
      let data = [];
      const res = await axios.get("http://localhost:4000/api/issue/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.issues)) {
        data = res.data.issues;
      }

      setIssues(data);
      setDisplayedIssues(data.slice(0, INITIAL_DISPLAY_COUNT));
      setShowMoreIssues(data.length > INITIAL_DISPLAY_COUNT);
    } catch (error) {
      setIssues([]);
      setDisplayedIssues([]);
      setShowMoreIssues(false);
    } finally {
      setLoadingIssues(false);
    }
  };

  // Load more projects and navigate to full project list
  const loadMoreProjects = () => {
    const newCount = displayedProjects.length + INITIAL_DISPLAY_COUNT;
    setDisplayedProjects(projects.slice(0, newCount));
    setShowMoreProjects(newCount < projects.length);
    navigate("/project/myProject");
  };

  // Load more issues and navigate to full issue list
  const loadMoreIssues = () => {
    const newCount = displayedIssues.length + INITIAL_DISPLAY_COUNT;
    setDisplayedIssues(issues.slice(0, newCount));
    setShowMoreIssues(newCount < issues.length);
    navigate("/issue/allIssue");
  };

  // Check user authorization on mount
  useEffect(() => {
    (async () => {
      const result = await isAuthorized();
      setAuthorized(result);
    })();
  }, []);

  // Fetch data only if authorized
  useEffect(() => {
    if (authorized === false) navigate("/login");
    if (authorized) {
      fetchProjects();
      fetchIssues();
    }
  }, [authorized]);

  // Show skeleton while checking auth
  if (authorized === null)
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Skeleton width={200} height={32} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={220}
          sx={{ mx: "auto", borderRadius: 3 }}
        />
      </Box>
    );

  if (authorized === false) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f2f4fa",
        p: { xs: 2, md: 5 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Welcome Section */}
      <Stack direction="row" alignItems="center" gap={2} mb={3}>
        <Avatar
          sx={{
            bgcolor: "#6c6fed",
            width: 48,
            height: 48,
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#23275c" }}>
            Welcome, {user?.name || "User"}!
          </Typography>
          <Typography color="#888ebc" fontSize={16}>
            Your project and issue overview at a glance.
          </Typography>
        </Box>
      </Stack>

      {/* View All Navigation Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => navigate("/project/myProject")}
          sx={{
            borderColor: "#6c6fed",
            color: "#6c6fed",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          View All Projects
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/issue/allIssue")}
          sx={{
            borderColor: "#f78c6c",
            color: "#f78c6c",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          View All Issues
        </Button>
      </Stack>


      {/* Grid layout for Projects, Issues, and Stats */}
      <Grid container spacing={3}>
        {/* My Projects Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <FolderIcon sx={{ color: "#6c6fed" }} />
                <Typography variant="h6" fontWeight={600}>
                  My Projects
                </Typography>
              </Stack>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => navigate("/project/create")}
                sx={{
                  bgcolor: "#6c6fed",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                New
              </Button>
            </Stack>
            <Stack gap={1}>
              {loadingProjects
                ? [1, 2].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
                  ))
                : displayedProjects.length > 0
                ? displayedProjects.map((project) => (
                    <Paper
                      key={project._id}
                      sx={{
                        p: 1.2,
                        bgcolor: "#f4f6fd",
                        borderRadius: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#ecefff" },
                      }}
                    >
                      <Typography fontWeight={500}>{project.title}</Typography>
                      {project.createdBy && (
                        <Typography variant="caption" color="text.secondary">
                          by {project.createdBy.name}
                        </Typography>
                      )}
                    </Paper>
                  ))
                : (
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      "Every great project starts with a single idea"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create your first project to get started!
                    </Typography>
                  </Box>
                )}
              {showMoreProjects && !loadingProjects && (
                <Button
                  variant="outlined"
                  onClick={loadMoreProjects}
                  sx={{
                    mt: 1,
                    borderColor: "#6c6fed",
                    color: "#6c6fed",
                    textTransform: "none",
                  }}
                >
                  Load More Projects
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Issues Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <BugReportIcon sx={{ color: "#f78c6c" }} />
                <Typography variant="h6" fontWeight={600}>
                  Recent Issues
                </Typography>
              </Stack>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => navigate("/issues/create")}
                sx={{
                  bgcolor: "#f78c6c",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                New
              </Button>
            </Stack>
            <Stack gap={1}>
              {loadingIssues
                ? [1, 2].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
                  ))
                : displayedIssues.length > 0
                ? displayedIssues.map((issue) => (
                    <Paper
                      key={issue._id}
                      sx={{
                        p: 1.2,
                        bgcolor: "#fff5ea",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontWeight={500}>{issue.title}</Typography>
                      <Chip
                        label={issue.status}
                        size="small"
                        sx={{
                          bgcolor:
                            issue.status === "Open"
                              ? "#e6f7ee"
                              : issue.status === "In Progress"
                              ? "#fff7ed"
                              : issue.status === "Closed"
                              ? "#ececec"
                              : "#e0e3ea",
                          color:
                            issue.status === "Open"
                              ? "#43bfa0"
                              : issue.status === "In Progress"
                              ? "#f78c6c"
                              : issue.status === "Closed"
                              ? "#9e9e9e"
                              : "#23275c",
                          fontWeight: 700,
                          borderRadius: 1,
                          minWidth: 70,
                          textTransform: "capitalize",
                        }}
                      />
                    </Paper>
                  ))
                : (
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      "A problem well stated is a problem half solved"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track your first issue to stay organized!
                    </Typography>
                  </Box>
                )}
              {showMoreIssues && !loadingIssues && (
                <Button
                  variant="outlined"
                  onClick={loadMoreIssues}
                  sx={{
                    mt: 1,
                    borderColor: "#f78c6c",
                    color: "#f78c6c",
                    textTransform: "none",
                  }}
                >
                  Load More Issues
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Stats Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <BarChartIcon sx={{ color: "#43bfa0" }} />
              <Typography variant="h6" fontWeight={600}>
                Stats
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography fontWeight={500}>Total Projects: {projects.length}</Typography>
              <Typography fontWeight={500}>
                Open Issues: {issues.filter((i) => i.status === "Open").length}
              </Typography>
              <Typography fontWeight={500}>Total Issues: {issues.length}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
