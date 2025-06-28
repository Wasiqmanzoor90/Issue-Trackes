import express from 'express';
const router = express.Router();
import {login, register, checkAuth} from '../controller/authController.js';
import authMiddleware from '../middleware/auth.middleware.js';


router.post('/login', login);
router.post('/register',  register);
router.get('/check', authMiddleware, checkAuth);
export default router;