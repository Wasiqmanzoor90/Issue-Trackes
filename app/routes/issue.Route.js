import express from 'express';
import {createIssue,getIssueByProject,getIssueById,updateIssue,deleteIssue} from'../controller/issueController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/',createIssue);
router.get('/', getIssueByProject);
router.get('/:id', getIssueById);
router.put('/:id',updateIssue);
router.post('/:id',deleteIssue); 


export default router;