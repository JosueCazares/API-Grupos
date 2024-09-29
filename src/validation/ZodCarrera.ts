import { z } from 'zod';  // Importamos Zod para la validación de datos.

// Esquema de validación para la creación de una carrera.
export const ZodCarreraObj = z.object({
    nombre: z.string().min(1, "El nombre de la carrera es requerido."),  // Nombre de la carrera
});

// Esquema de validación para actualizar una carrera.
export const ZodCarreraIdObj = z.object({
    id: z.number().positive().min(1, "El ID de la carrera es requerido."),  // ID de la carrera
    nombre: z.string().min(1, "El nombre de la carrera es requerido."),      // Nombre de la carrera
});
