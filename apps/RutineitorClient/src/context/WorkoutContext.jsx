import { createContext, useContext, useState } from "react"
import { getWorkoutRequest, createOrUpdateWorkoutRequest, deleteWorkoutRequest } from '../api/workout.js';
import { useAuth } from './AuthContext';

export const WorkoutContext = createContext()

export const useWorkout = () => {
    const context = useContext(WorkoutContext)
    if (!context) throw new Error("useWorkout must be used within an WorkoutProvider")
    return context
}

export const WorkoutProvider = ({ children }) => {
    const { user } = useAuth()
    const [workout, setWorkout] = useState({
        date: null,
        blockList: []
    })

    const getWorkout = async (date) => {
        try {
            const res = await getWorkoutRequest(date)
            setWorkout(prevWorkout => ({
                date: prevWorkout.date,
                blockList: res.data.blockList
            }))
        } catch (error) {
            if (error.response.data.message === "Rutina no encontrada") {
                const localState = localStorage.getItem(workout.date + user.username)
                setWorkout(prevWorkout => ({
                    date: prevWorkout.date,
                    blockList: localState ? JSON.parse(localState) : []
                }))
            }
        }
    }

    const createOrUpdateWorkout = async (workout) => {
        try {
            await createOrUpdateWorkoutRequest(workout)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteWorkout = async (date) => {
        try {
            await deleteWorkoutRequest(date)
        } catch (error) {
            console.log(error)
        }

        setWorkout(prevWorkout => ({
            date: prevWorkout.date,
            blockList: []
        }))
    }

    return (
        <WorkoutContext.Provider
            value={{
                workout,
                setWorkout,
                getWorkout,
                createOrUpdateWorkout,
                deleteWorkout
            }}>
            {children}
        </WorkoutContext.Provider>
    )
}