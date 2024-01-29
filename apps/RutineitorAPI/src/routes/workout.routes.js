import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { getWorkout, createOrUpdateWorkout, deleteWorkout } from '../controllers/workout.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createWorkoutSchema } from '../schemas/workout.schema.js';


const router = Router();

router.get('/workout/:date', authRequire, getWorkout);
router.post('/workout/', authRequire, validateSchema(createWorkoutSchema), createOrUpdateWorkout);
router.delete('/workout/:date', authRequire, deleteWorkout);

export default router;