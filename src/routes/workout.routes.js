import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { getWorkout, getMonthWorkouts, createOrUpdateWorkout, deleteWorkout, fetchWorkoutByType } from '../controllers/workout.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createWorkoutSchema } from '../schemas/workout.schema.js';


const router = Router();

router.get('/workout/:date', authRequire, getWorkout);
router.get('/workouts/', authRequire, getMonthWorkouts);
router.post('/workout/', authRequire, validateSchema(createWorkoutSchema), createOrUpdateWorkout);
router.delete('/workout/:date', authRequire, deleteWorkout);
router.get('/workout-list/:type', authRequire, fetchWorkoutByType);


export default router;