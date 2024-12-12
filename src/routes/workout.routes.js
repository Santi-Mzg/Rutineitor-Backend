import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { getWorkout, getCalendarWorkouts, createOrUpdateWorkout, deleteWorkout, fetchWorkoutsByType, fetchWorkoutsByExercise } from '../controllers/workout.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createWorkoutSchema } from '../schemas/workout.schema.js';


const router = Router();

router.get('/workout/:date', authRequire, getWorkout);
router.post('/workout/', authRequire, validateSchema(createWorkoutSchema), createOrUpdateWorkout);
router.delete('/workout/:date', authRequire, deleteWorkout);
router.get('/workout-calendar-list/:date', authRequire, getCalendarWorkouts);
router.get('/workout-type-list/:type', authRequire, fetchWorkoutsByType);
router.get('/workout-exercise-list/:exercise', authRequire, fetchWorkoutsByExercise);


export default router;