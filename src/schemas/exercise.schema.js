import { z } from 'zod'

export const exerciseSchema = z.object({
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
        .default("1"),
    weight: z
        .string({
            required_error: 'Peso necesario'
        })
        .default("Libre"),
})
