import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, updateUser, logout, getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/logout', logout);
router.get('/:userId', getUser);

export default router;