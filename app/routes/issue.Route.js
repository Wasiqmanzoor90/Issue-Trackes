import express from 'express';
import {createIssue,getIssueByProject,getIssueById,updateIssue,deleteIssue, createComment, getComment} from'../controller/issueController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/',createIssue);
router.get('/', getIssueByProject);
router.get('/:id', getIssueById);
router.put('/:issueId', updateIssue);
router.post('/comment', createComment);
router.get("/getComment/:issueId", getComment);
router.delete('/:id',deleteIssue); 


export default router;