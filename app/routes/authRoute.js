import express from 'express';
const router = express.Router();
import {login, register} from '../controller/authController.js';
import authMiddleware from '../middleware/auth.middleware.js';

router.post('/login', login);
router.post('/register',  register);
export default router;