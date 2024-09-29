import { z } from 'zod';  // Importamos Zod para la validación de datos.

// Esquema de validación para la creación de un grupo.
export const ZodGrupoObj = z.object({
    nombre: z.string().min(1, "El nombre del grupo es requerido."),  // Nombre del grupo
    periodo: z.string().min(1, "El periodo es requerido."),          // Periodo del grupo
    carreraId: z.number().positive(),                                 // ID de la carrera
    profesor: z.string().min(1, "El nombre del profesor es requerido."), // Nombre del profesor
});

// Esquema de validación para actualizar un grupo.
export const ZodGrupoIdObj = z.object({
    id: z.number().positive().min(1, "El ID del grupo es requerido."), // ID del grupo
    nombre: z.string().min(1, "El nombre del grupo es requerido."),
    periodo: z.string().min(1, "El periodo es requerido."),
    carreraId: z.number().positive(),
    profesor: z.string().min(1, "El nombre del profesor es requerido."),
});
