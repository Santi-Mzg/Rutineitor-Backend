import { z } from 'zod'
import { exerciseSchema } from './exercise.schema.js'

export const blockSchema = z.object({
    series: z
        .number({
            required_error: 'Número de series requerido'
        })
        .int()
        .default(3),
    exerciseList: z
        .array(exerciseSchema)
        .default([])
})