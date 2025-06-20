import express from 'express';
import { createProject, getAllProjects, getProjectById,  deleteProject } from '../controller/projectContrller.js';
import authMiddleware from '../middleware/auth.middleware.js';


const router = express.Router();

// 🔐 Protect all routes with auth
router.use(authMiddleware);

router.post('/', createProject); // Create a new project
router.get('/', getAllProjects); // Get all projects
router.get('/:id', getProjectById); // Should be '/Byid/:id'
router.post('/:id', deleteProject); // Should be '/delete/:id'


export default router;