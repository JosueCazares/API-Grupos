import { z } from 'zod';  // Importamos Zod para manejar los errores de validación.
import type { Response } from 'express';  // Importamos el tipo Response de Express.

// Función para manejar errores de validación con Zod y otros errores generales.
export function handleZodError(res: Response, error: unknown) {
    if (error instanceof z.ZodError) {
        // Si el error es una instancia de ZodError, devolvemos un error 400 con los detalles de la validación fallida.
        return res.status(400).json({
            status: "error",
            error: "Datos inválidos",
            data: error.errors,  // Incluimos los errores específicos de validación.
        });
    }
    // Para otros errores, devolvemos un error 500 (Error interno del servidor).
    return res.status(500).json({
        status: "error",
        error: "Error en el servidor",
    });
}
