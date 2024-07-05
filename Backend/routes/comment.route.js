import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
    createComment, deleteComment, getComments, likeComment, updateComment 
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.put('/update/:commentId', verifyToken, updateComment);
router.delete('/delete/:commentId', verifyToken ,deleteComment);
router.get('/get/:postId', getComments);
router.put('/like/:commentId', verifyToken, likeComment);

export default router;