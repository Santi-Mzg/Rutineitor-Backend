import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { deleteUser, getUsers, getUser } from '../controllers/user.controller.js';


const router = Router();

router.get('/users/', authRequire, getUsers);
router.get('/user/:username', authRequire, getUser);
router.delete('/user/:id', authRequire, deleteUser);

export default router;