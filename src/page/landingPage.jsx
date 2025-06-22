import React, { useState } from 'react';
import {
  Box, Typography, Button, Fade, Chip, Stack, MobileStepper, Paper, useTheme,
  Grid, Stepper, Step, StepLabel, Avatar, Card, CardContent, Divider, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    title: "Create & Track Bugs",
    icon: <BugReportRoundedIcon sx={{ fontSize: 60, color: "#6c6fed" }} />,
    description: "Easily report, view, and track bugs across all your projects with intuitive forms and detailed history.",
  },
  {
    title: "Assign & Prioritize",
    icon: <Groups2RoundedIcon sx={{ fontSize: 60, color: "#b8c0e0" }} />,
    description: "Assign issues to developers, set priorities and statuses, and stay in sync with your team.",
  },
  {
    title: "Drag-and-Drop Boards",
    icon: <AutoAwesomeMotionRoundedIcon sx={{ fontSize: 60, color: "#7858e6" }} />,
    description: "Organize issues visually in beautiful boards. Move tasks between To Do, In Progress, and Done.",
  },
  {
    title: "Role Management",
    icon: <SecurityRoundedIcon sx={{ fontSize: 60, color: "#5cdbd3" }} />,
    description: "Powerful role-based access for Admins and Developers. Control permissions easily.",
  },
  {
    title: "Instant Notifications",
    icon: <MarkEmailUnreadRoundedIcon sx={{ fontSize: 60, color: "#f7b500" }} />,
    description: "Automatic email alerts on assignment or status change. Never miss an update.",
  }
];

const features = [
  {
    icon: <TimelineRoundedIcon sx={{ fontSize: 38, color: "#68d8d6" }} />,
    title: "Activity Timeline",
    desc: "Stay updated with a complete activity log for every issue and project."
  },
  {
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 38, color: "#e6cc57" }} />,
    title: "Status Automation",
    desc: "Automated status transitions and reminders to keep work flowing."
  },
  {
    icon: <EmojiEmotionsRoundedIcon sx={{ fontSize: 38, color: "#f796a0" }} />,
    title: "Feedback & Comments",
    desc: "Rich comment threads and emoji reactions for every issue."
  },
  {
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 38, color: "#9b7bf4" }} />,
    title: "Custom Workflows",
    desc: "Tailor boards, tags, and flows to match your team's unique needs."
  }
];

const howItWorks = [
  "Sign up and create your first project for free.",
  "Invite your team and set roles & permissions.",
  "Report bugs or feature requests in seconds.",
  "Organize and prioritize tasks on your board.",
  "Track progress and receive instant updates."
];

const testimonials = [
  {
    name: "Jane Doe",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    quote: "This tracker transformed our team's workflow. The drag-and-drop boards and instant notifications are game changers!"
  },
  {
    name: "Carlos Santos",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Assigning and tracking issues has never been easier. Our bug resolution rate improved by 40% in just a month."
  }
];

const faqs = [
  {
    q: "Is my data secure?",
    a: "Absolutely. We use industry-leading encryption and have strict access controls to keep your data safe."
  },
  {
    q: "Can I integrate this with other tools?",
    a: "Yes, we support integrations via API and popular services like Slack, Jira, and GitHub."
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes! Start tracking bugs and issues for free. No credit card required."
  }
];

function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw', overflow: 'hidden', bgcolor: "#181f4b" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: "linear-gradient(120deg, #1a1c4b 100%, #181f4b 100%)",
          position: 'relative',
          px: { xs: 2, md: 0 },
        }}
      >
        {/* Hero shapes */}
        <Box sx={{ position: 'absolute', top: 90, left: 70, width: 210, height: 210, border: '2px solid #7b7bcf', borderRadius: '50%', opacity: 0.13, zIndex: 1, filter: 'blur(0.7px)' }} />
        <Box sx={{ position: 'absolute', bottom: 30, right: 70, width: 150, height: 150, border: '2px solid #5cdbd3', borderRadius: '50%', opacity: 0.12, zIndex: 1, filter: 'blur(0.7px)' }} />
        <Grid container spacing={6} alignItems="center" justifyContent="center" sx={{ zIndex: 2, width: '100%' }}>
          <Grid item xs={12} md={7}>
            <Fade in timeout={800}>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
                  fontWeight: 900,
                  letterSpacing: 0.2,
                  fontSize: { xs: "2.2rem", md: "3.7rem" },
                  lineHeight: 1.1,
                  mb: 2,
                  textShadow: "0 3px 14px #23286688",
                }}>
                The Modern Bug & Issue Tracker
              </Typography>
            </Fade>
            <Fade in timeout={1100}>
              <Typography
                sx={{
                  color: "#b8c0e0",
                  mb: 4,
                  fontFamily: `"Inter", "Segoe UI", Arial, sans-serif`,
                  fontSize: { xs: 19, md: 22 },
                  fontWeight: 500,
                  maxWidth: 540,
                  lineHeight: 1.7,
                }}
              >
                Track, organize, and crush bugs for all your projects with a beautiful, collaborative, and intuitive interface. Assign, prioritize, drag-and-drop, and never miss a beat with instant notifications and smart boards.
              </Typography>
            </Fade>
            <Fade in timeout={1300}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
                <Button
                onClick={()=> navigate('/dashboard')}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    fontWeight: 700,
                    fontSize: '1.17rem',
                    fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
                    background: "#2e3180",
                    color: "#fff",
                    boxShadow: 'none',
                    textTransform: 'none',
                    letterSpacing: 0.3,
                    '&:hover': {
                      background: "#3b3fa1",
                      color: "#fff",
                    },
                  }}
                >
                  Start Tracking Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={()=> window.open('https://youtu.be/v-L-gl6Z19g?si=FexXol-xQqwuTG6e')}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 700,
                    fontSize: '1.17rem',
                    fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
                    borderColor: "#565da7",
                    color: "#fff",
                    background: "transparent",
                    textTransform: 'none',
                    letterSpacing: 0.3,
                    '&:hover': {
                      background: "#232866",
                      color: "#fff",
                      borderColor: "#232866"
                    
                    },
                  }}
                >
                  Live Demo
                </Button>
              </Stack>
            </Fade>
            <Fade in timeout={1500}>
              <Chip
                label="No credit card required"
                sx={{
                  bgcolor: '#23275c',
                  color: '#fff',
                  fontWeight: 700,
                  fontFamily: '"Poppins", "Inter", sans-serif',
                  fontSize: 17,
                  letterSpacing: 0.4,
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: '0 2px 12px 0 #23275c44',
                  border: '1px solid #23275c66',
                }}
              />
            </Fade>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
              elevation={5}
              sx={{
                bgcolor: "rgba(35,37,92,0.96)",
                borderRadius: 5,
                width: "100%",
                maxWidth: 410,
                px: { xs: 2, md: 5 },
                py: { xs: 5, md: 6 },
                textAlign: "center",
                boxShadow: '0 8px 44px 0 #23275c66',
                mb: 2,
                color: "#fff",
                zIndex: 2
              }}
            >
              <Fade in timeout={900 + activeStep * 100}>
                <Box>
                  <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                    {slides[activeStep].icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.5rem", md: "1.7rem" },
                      fontFamily: '"Poppins", "Inter", sans-serif',
                      letterSpacing: 0.2,
                      mb: 1.2,
                      color: "#fff",
                      textShadow: "0 2px 10px #23286655",
                    }}
                  >
                    {slides[activeStep].title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#b8c0e0",
                      fontSize: { xs: 16, md: 17 },
                      fontFamily: '"Inter", sans-serif',
                      mb: 1.5,
                      lineHeight: 1.6,
                      minHeight: 48,
                    }}
                  >
                    {slides[activeStep].description}
                  </Typography>
                </Box>
              </Fade>
              <MobileStepper
                variant="dots"
                steps={slides.length}
                position="static"
                activeStep={activeStep}
                sx={{
                  bgcolor: "transparent",
                  mb: 1,
                  '.MuiMobileStepper-dot': {
                    backgroundColor: "#565da7",
                    opacity: 0.5,
                  },
                  '.MuiMobileStepper-dotActive': {
                    backgroundColor: "#fff",
                    opacity: 1,
                  }
                }}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === slides.length - 1}
                    sx={{
                      color: "#fff",
                      minWidth: 34,
                      '&:hover': { color: "#b8c0e0", background: "#232866" }
                    }}
                  >
                    <ArrowForwardIosRoundedIcon />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                      color: "#fff",
                      minWidth: 34,
                      '&:hover': { color: "#b8c0e0", background: "#232866" }
                    }}
                  >
                    <ArrowBackIosNewRoundedIcon />
                  </Button>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Section Divider */}
      <Divider sx={{ my: { xs: 4, md: 8 }, borderColor: "#282a55" }} />

      {/* FEATURES GRID */}
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: { xs: 1, md: 2 }, mb: { xs: 8, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            mb: 4,
            fontWeight: 800,
            fontFamily: `"Poppins", "Inter", sans-serif`,
            letterSpacing: 0.2,
            textAlign: "center"
          }}>
          All-in-one Solution for Teams
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 5,
                  bgcolor: "#20224a",
                  color: "#fff",
                  px: 2,
                  py: 4,
                  minHeight: 210,
                  boxShadow: '0 2px 10px #23275c33',
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start"
                }}>
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>{f.icon}</Box>
                <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 1, fontFamily: '"Poppins", sans-serif' }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#b8c0e0", fontSize: 16, fontFamily: '"Inter", sans-serif' }}>
                  {f.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* HOW IT WORKS */}
      <Box sx={{ width: "100%", bgcolor: "#20224a", py: { xs: 6, md: 10 }, mb: { xs: 8, md: 10 } }}>
        <Box sx={{ width: "100%", maxWidth: 950, mx: "auto", px: { xs: 1, md: 2 } }}>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontFamily: `"Poppins", "Inter", sans-serif`,
              letterSpacing: 0.2,
              mb: 4,
              textAlign: "center"
            }}>
            How it Works
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={howItWorks.length}
            sx={{
              bgcolor: "transparent",
              '& .MuiStepLabel-label': {
                color: "#b8c0e0",
                fontWeight: 500,
                fontFamily: '"Inter", sans-serif'
              },
              '& .MuiStepIcon-root': {
                color: "#7858e6"
              },
              mb: 4
            }}
          >
            {howItWorks.map((label, idx) => (
              <Step key={label}>
                <StepLabel>
                  <Typography sx={{ color: "#fff", fontWeight: 600, fontFamily: '"Poppins", sans-serif' }}>{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* TESTIMONIALS */}
      <Box sx={{ width: "100%", maxWidth: 1100, px: { xs: 1, md: 2 }, mb: { xs: 10, md: 12 }, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontFamily: `"Poppins", "Inter", sans-serif`,
            letterSpacing: 0.2,
            mb: 4,
            textAlign: "center"
          }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, idx) => (
            <Grid key={idx} item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#20224a",
                  color: "#fff",
                  boxShadow: '0 2px 10px #23275c33',
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 3,
                  height: "100%"
                }}
              >
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{ width: 64, height: 64, mt: 1, border: '3px solid #6c6fed' }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 19 }}>{t.name}</Typography>
                  <Typography sx={{ color: "#b8c0e0", fontSize: 15, mb: 1 }}>{t.role}</Typography>
                  <Typography sx={{ fontSize: 17, fontFamily: '"Inter", sans-serif' }}>"{t.quote}"</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ */}
      <Box sx={{ width: "100%", bgcolor: "#1a1c4b", py: { xs: 6, md: 9 } }}>
        <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", px: { xs: 1, md: 2 } }}>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontFamily: `"Poppins", "Inter", sans-serif`,
              letterSpacing: 0.2,
              mb: 4,
              textAlign: "center"
            }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, idx) => (
            <Accordion key={idx} sx={{ bgcolor: "#23275c", color: "#fff", mb: 2, borderRadius: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#b8c0e0" }} />}>
                <Typography sx={{ fontWeight: 600, fontFamily: '"Poppins", sans-serif', fontSize: 17 }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#b8c0e0", fontFamily: '"Inter", sans-serif', fontSize: 16 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

    
    </Box>
  );
}

export default Landing;