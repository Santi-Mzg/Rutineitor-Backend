import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { getWorkout, getCalendarWorkouts, createOrUpdateWorkout, deleteWorkout, fetchWorkoutsByType, fetchWorkoutsByExercise } from '../controllers/workout.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createWorkoutSchema } from '../schemas/workout.schema.js';


const router = Router();

router.get('/workout/:id/:date', authRequire, getWorkout);
router.post('/workout/:id/', authRequire, validateSchema(createWorkoutSchema), createOrUpdateWorkout);
router.delete('/workout/:id/:date', authRequire, deleteWorkout);
router.get('/workout-calendar-list/:id/:date', authRequire, getCalendarWorkouts);
router.get('/workout-type-list/:type', authRequire, fetchWorkoutsByType);
router.get('/workout-exercise-list/:exercise', authRequire, fetchWorkoutsByExercise);


export default router;