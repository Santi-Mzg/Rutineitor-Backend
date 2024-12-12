import { z } from 'zod'

export const registerSchema = z.object({
    username: z
        .string({
            required_error: 'Nombre de usuario requerido'
        }),
    email: z
        .string({
            required_error: 'Email requerido'
        })
        .email({
            message: 'Email inválido'
        }),
    password: z
        .string({
            required_error: 'Contraseña requerida'
        })
        .min(5, {
            message: 'La contraseña debe ser de al menos 5 caracteres'
        }),
})

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email requerido'
        })
        .email({
            message: 'Email inválido'
        }),
    password: z
        .string({
            required_error: 'Contraseña requerida'
        })
        .min(5, {
            message: 'La contraseña debe ser de al menos 5 caracteres'
        }),
})

export const modifySchema = z.object({
    username: z
        .string(),
    age: z
        .string(),
    weight: z
        .string(),
    height: z
        .string(),
    goal: z
        .string(),
})
