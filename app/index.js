// Load env variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';  // Import cors for handling CORS issues

const server = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectDb();

// Middleware
server.use(cors());  // ← Add this line
server.use(express.json());

// Routes
server.use('/api/auth', authRoute);

// Start server
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});