import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  CircularProgress,
  Avatar,
} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Comment() {
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams(); // issueId

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchComment(id);
    }
    // eslint-disable-next-line
  }, [token, id]);

  const fetchComment = async (issueId) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:4000/api/issue/getComment/${issueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment(res.data.comment || []);
    } catch (error) {
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  const createComment = async () => {
    if (!text.trim()) return;
    setPosting(true);
    try {
      await axios.post(
        `http://localhost:4000/api/issue/Comment`,
        { text, issueId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setText("");
      fetchComment(id);
      setSnackbar({ open: true, message: "Comment posted!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to post comment.", severity: "error" });
    } finally {
      setPosting(false);
    }
  };

  // Simple avatar (first letter of username/email)
  const getUserAvatar = (user) => {
    if (!user) return "?";
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#f5f8ff",
          maxWidth: 900,
          mx: "auto",
          borderRadius: "22px",
          py: 4,
          px: { xs: 1, sm: 5 },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          sx={{
            mb: 3,
            textAlign: "center",
            color: "#3a3a6a",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: 38, mr: 1, color: "#3a3a6a" }}/>
          Comments
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : comment.length === 0 ? (
          <Typography color="text.secondary" sx={{ my: 3, textAlign: "center" }}>
            No comments yet.
          </Typography>
        ) : (
          <Stack spacing={3} mb={4}>
            {[...comment].reverse().map((c, i) => (
              <Paper
                key={i}
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: "#fff",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  border: "1.5px solid #f0f1f6",
                  boxShadow: "0 2px 8px 0 #e3e6f080",
                }}
              >
                <Avatar sx={{
                  bgcolor: "#7e78fa",
                  color: "#fff",
                  fontWeight: 700,
                  width: 42,
                  height: 42,
                  mt: 0.5,
                  fontSize: 22,
                  boxShadow: 1
                }}>
                  {getUserAvatar(c.userId)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonOutlineIcon sx={{ color: "#7e78fa", fontSize: 18 }}/>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#23275c" }}>
                      {c.userId?.name || c.userId?.email || "Unknown User"}
                    </Typography>
                  </Stack>
                  <Typography sx={{ my: 1.2, color: "#23275c" }}>{c.text}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon sx={{ color: "#a0a4b8", fontSize: 16 }}/>
                    <Typography variant="caption" color="text.secondary">
                      {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Comment Input Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 3,
            borderRadius: 4,
            bgcolor: "#fff",
            border: "1.5px solid #f0f1f6",
            boxShadow: "0 2px 8px 0 #e3e6f080",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-end">
            <TextField
              fullWidth
              label="Write a comment"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={posting}
              sx={{ background: "#f8fafc", borderRadius: 2 }}
            />
            <Button
              variant="contained"
              onClick={createComment}
              disabled={!text.trim() || posting}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                fontWeight: 700,
                background: "linear-gradient(90deg, #7e78fa 50%, #23275c 100%)"
              }}
            >
              {posting ? <CircularProgress size={24} /> : "Post"}
            </Button>
          </Stack>
        </Paper>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          message={snackbar.message}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Box>
  );
}

export default Comment;