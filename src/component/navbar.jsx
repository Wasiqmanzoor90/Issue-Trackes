import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useTheme } from '@mui/material/styles';

const navLinks = [
  { label: 'Home', icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />, href: '/' },
  { label: 'Features', icon: <StarRoundedIcon sx={{ fontSize: 20 }} />, href: '/features' },
  { label: 'Contact', icon: <MailRoundedIcon sx={{ fontSize: 20 }} />, href: '/contact' },
  { label: 'Sign Up', icon: <PersonAddAltRoundedIcon sx={{ fontSize: 20 }} />, href: '/signup' },
];

function Navbar() {
  // Color theme extracted from image
  const background = "#1a1c4b";
  const textColor = "#fff";
  const navLinkColor = "#fff";
  const signUpBg = "#2e3180";
  const signUpHover = "#3b3fa1";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: background,
        boxShadow: 'none',
        py: 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 10 }, minHeight: 74 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 900,
            letterSpacing: 1.5,
            color: textColor,
            fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
            fontSize: { xs: '1.22rem', md: '1.37rem' },
          }}
        >
          MyCompany
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 } }}>
          {navLinks.map((link, i) => (
            <Button
              key={link.label}
              color="inherit"
              startIcon={link.icon}
              href={link.href}
              variant={link.label === 'Sign Up' ? 'contained' : 'text'}
              disableElevation
              sx={{
                fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
                fontWeight: 400,
                fontSize: { xs: '0.8rem', md: '1.07rem' },
                px: 2.4,
                py: 1.1,
                borderRadius: 2.5,
                background: link.label === 'Sign Up' ? signUpBg : "transparent",
                color: navLinkColor,
                boxShadow: 'none',
                textTransform: 'none',
                letterSpacing: 0.3,
                border: "none",
                '&:hover': {
                  background: link.label === 'Sign Up' ? signUpHover : "#232866",
                  color: "#fff",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;