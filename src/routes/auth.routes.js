import { Router } from 'express';
import { register, login, logout, verifyToken, modify } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema, modifySchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.post('/modify', validateSchema(modifySchema), modify);


export default router;