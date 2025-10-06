import Workout from '../models/workout.model.js'
import Subscription from '../models/subscription.model.js';
import webpush from 'web-push';

export const getWorkout = async (req, res) => {

    try {
        const { date, id } = req.params

        const workoutFound = await Workout.findOne({ date: date, user: id });
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" });

        res.json(workoutFound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCalendarWorkouts = async (req, res) => {
    try {
        const { date, id } = req.params
        const currentDate = new Date();
        const dateClass = new Date(date) 
        
        const firstDay = new Date(dateClass.getFullYear(), dateClass.getMonth() - 1, 22);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 6);
        
        // Formatear fechas para la consulta
        const firstDayFormatted = firstDay.toISOString().split('T')[0];
        const lastDayFormatted = lastDay.toISOString().split('T')[0];

        // Realizar la consulta con el rango de fechas
        const workouts = await Workout.find({
            date: { $gte: firstDayFormatted, $lte: lastDayFormatted },
            user: id,
        });

        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: "No se encontraron rutinas" });
        }

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createOrUpdateWorkout = async (req, res) => {
    const { date, type, blockList, comments } = req.body;
    const { id } = req.params;

    try {
        const dateObj = new Date(date) // Convierte la cadena de fecha a un objeto Date

        const workoutFound = await Workout.findOneAndUpdate(
            { date: dateObj, user: id },
            { user: id, date: dateObj, type, blockList, comments },
            { upsert: true, new: true, setDefaultsOnInsert: true }
         )
        if(workoutFound) {
            const subscription = await Subscription.findOne({ user: id });
            if (subscription) {
                const payload = JSON.stringify({
                    title: 'Se ha agregado un entrenamiento! 💪',
                    body: `Entrenamiento de: ${workoutFound.type} el día ${workoutFound.date}`,
                    icon: '/pwa-192x192.png',
                });
            
                try {
                    await webpush.sendNotification(subscription.subscription, payload);
                    console.log(`Notificación enviada a ${id}`);
                } catch (err) {
                    console.error('Error enviando notificación:', err);
                }
            }
        }

        res.json(workoutFound);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteWorkout = async (req, res) => {
    try {
        console.log("date "+req.params.date)
        console.log("id "+req.params.id)
        const workoutFound = await Workout.findOneAndDelete({ date: req.params.date, user: req.params.id });
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" });

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Ruta para obtener rutinas por tipo
export const fetchWorkoutsByType = async (req, res) => {
    const { type } = req.params;

    try {
      const workouts = await Workout.find({ user: req.user.id, type: type })

      if (!workouts || workouts.length === 0) {
        return res.status(404).json({ message: "No se encontraron rutinas" });
    }

      console.log(workouts)
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const fetchWorkoutsByExercise = async (req, res) => {
    const { exercise } = req.params;
    console.log(exercise)
    try {
        const workouts = await Workout.find({ user: req.user.id, 'blockList.exerciseList.label': exercise })

        if (!workouts || workouts.length === 0) {
        return res.status(404).json({ message: "No se encontraron rutinas" });
    }

        console.log(workouts)
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const fetchRecords = async (req, res) => {
//     console.log(exercise)
//     try {
//         const workouts = await Workout.find({ user: req.user.id, 'blockList.exerciseList.label': exercise })

//         if (!workouts || workouts.length === 0) {
//         return res.status(404).json({ message: "No se encontraron rutinas" });
//     }

//         console.log(workouts)
//         res.json(workouts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



