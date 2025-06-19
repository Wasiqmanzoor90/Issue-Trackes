import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDb from './config/db.js';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import testMailRoute from './routes/testMail.js'; // ✅ corrected

const server = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectDb();

// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use('/api/auth', authRoute);
server.use('/api/testMail', testMailRoute); // ✅ fixed

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
