import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { deleteUser, getUsers, getUser, getUserMilestones } from '../controllers/user.controller.js';


const router = Router();

router.get('/users/', authRequire, getUsers);
router.get('/user/:username', authRequire, getUser);
router.delete('/user/:id', authRequire, deleteUser);
router.get('/user/milestones', authRequire, getUserMilestones);


export default router;