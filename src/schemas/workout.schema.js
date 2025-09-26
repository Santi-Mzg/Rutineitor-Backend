import { z } from 'zod'
import { blockSchema } from './block.schema.js'

export const createWorkoutSchema = z.object({
    date: z
        .string({
            required_error: 'Fecha requerida'
        }),
    type: z
        .string({
            required_error: 'Tipo requerido'
        }),
    blockList: z
        .array(blockSchema)
        .default([]),
    comments: z
        .string().default('')
})