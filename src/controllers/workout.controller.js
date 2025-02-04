import Workout from '../models/workout.model.js'

export const getWorkout = async (req, res) => {
    try {
        const workoutFound = await Workout.findOne({ date: req.params.date, user: req.user.id });
        if (!workoutFound) return res.status(404).json({ message: "Rutina no encontrada" });

        res.json(workoutFound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCalendarWorkouts = async (req, res) => {
    try {
        const { date } = req.params
        const currentDate = new Date();
        const dateClass = new Date(date) 
        
        const firstDay = new Date(dateClass.getFullYear(), dateClass.getMonth(), 22);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 6);
        
        // Formatear fechas para la consulta
        const firstDayFormatted = firstDay.toISOString().split('T')[0];
        const lastDayFormatted = lastDay.toISOString().split('T')[0];
        console.log("dateClass "+dateClass)

        console.log("dateClassMonth "+dateClass.getMonth())

        console.log("firstDayFormatted "+firstDayFormatted)
        console.log("lastDayFormatted "+lastDayFormatted)
        console.log("user "+JSON.stringify(req.user))

        // Realizar la consulta con el rango de fechas
        const workouts = await Workout.find({
            date: { $gte: firstDayFormatted, $lte: lastDayFormatted },
            user: req.user.id,
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

    try {
        const dateObj = new Date(date) // Convierte la cadena de fecha a un objeto Date

        const workoutFound = await Workout.findOneAndUpdate(
            { date: dateObj, user: req.user.id },
            { user: req.user.id, date: dateObj, type, blockList, comments },
            { upsert: true, new: true }
         )

        console.log(req.user)

        res.json(workoutFound);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteWorkout = async (req, res) => {
    try {
        const workoutFound = await Workout.findOneAndDelete({ date: req.params.date, user: req.user.id });
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


