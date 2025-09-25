import { z } from 'zod'
import { exerciseSchema } from './exercise.schema'

export const recordSchema = z.object({
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