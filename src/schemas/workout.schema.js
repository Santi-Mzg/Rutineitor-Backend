import { z } from 'zod'

const exerciseSchema = z.object({
    label: z
        .string({
            required_error: 'Etiqueta requerida'
        }),
    isometric: z
        .boolean({
            required_error: 'Necesario saber si es isométrico'
        })
        .default(z.coerce.boolean().parse(0)),
    weighted: z
        .boolean({
            required_error: 'Necesario saber si es lastrado'
        })
        .default(z.coerce.boolean().parse(0)),
    volume: z
        .string({
            required_error: 'Volumen necesario'
        })
        .default(10),
    weight: z
        .string({
            required_error: 'Peso necesario'
        })
        .nullable()
        .default(null),
})

const blockSchema = z.object({
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