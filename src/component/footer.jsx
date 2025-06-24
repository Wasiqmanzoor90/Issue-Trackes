import React from 'react';
import { Box, Typography, Link, Stack, IconButton } from '@mui/material';


function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "#1a1c4b", // Match landing/nav background
        py: 4,
        px: { xs: 2, md: 10 },
        display: 'flex',
        flexDirection: { xs: "column", md: "row" },
        justifyContent: 'space-between',
        alignItems: { xs: "flex-start", md: "center" },
        color: "#fff",
        boxShadow: '0 -2px 12px 0 #181f4b44',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        mt: 7,
        width: "100vw",
        gap: { xs: 3, md: 0 }
      }}
    >
      {/* Left: Copyright/Brand */}
      <Typography
        variant="body2"
        sx={{
          fontFamily: `"Poppins", "Inter", "Segoe UI", Arial, sans-serif`,
          fontWeight: 700,
          color: "#fff",
          opacity: 1,
          letterSpacing: 0.2,
          fontSize: { xs: 15, md: 17 }
        }}
      >
        © {new Date().getFullYear()} <Box component="span" sx={{ fontWeight: 900, color: "#fff", ml: 0.5 }}>MyCompany</Box>. All rights reserved.
      </Typography>
      

    </Box>
  );
}

export default Footer;