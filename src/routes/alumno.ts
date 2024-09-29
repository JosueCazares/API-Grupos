// Rutas para manejar operaciones CRUD en la entidad Alumno
import { Router } from 'express';  // Importamos Router para definir nuestras rutas.
import type { Request, Response } from 'express';  // Tipos de Express para Request y Response.
import { prisma } from '../db';  // Prisma es el cliente de la base de datos.
import type { APIResponse } from '../lib/types';  // Importamos el tipo de respuesta APIResponse.
import type { Alumno } from '@prisma/client';  // Importamos el tipo Alumno de Prisma.
import { ZodAlumnoObj, ZodAlumnoIdObj } from '@/validation/ZodAlumno';  // Esquemas de validación Zod para Alumno.
import { handleZodError } from '../lib/handleZodError';  // Ruta relativa hacia el archivo.


export const router = Router();  // Creamos un router para las rutas de alumno.

// Ruta GET: Obtiene la lista de alumnos
router.get('/', async (_: Request, res: Response) => {
    let alumno = await prisma.alumno.findMany();  // Consulta a la base de datos para obtener todos los alumnos.

    // Respuesta exitosa con la lista de alumnos
    let responseOk: APIResponse<Alumno[]> = {
        status: 'success',
        data: alumno
    };

    return res.status(200).json(responseOk);  // Enviamos la respuesta con el código HTTP 200.
});

// Ruta POST: Crea un nuevo alumno
router.post('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodAlumnoObj.parse(req.body);  // Validamos los datos del request con Zod.
        let alumno = await prisma.alumno.create({
            data: camposValidados
        });

        // Respuesta exitosa con el alumno recién creado
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: alumno
        };
        return res.status(200).json(responseOk);  // Enviamos la respuesta con el código HTTP 200.
    } catch (error) {
        return handleZodError(res, error);  // Manejamos el error con la función auxiliar.
    }
});

// Ruta PUT: Actualiza un alumno existente
router.put('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodAlumnoIdObj.parse(req.body);  // Validamos los datos del request con Zod.
        let alumnoBusqueda = await prisma.alumno.findFirst({
            where: { id: camposValidados.id },
        });

        if (!alumnoBusqueda) {
            // Si no se encuentra el alumno, enviamos un error 404.
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Alumno no encontrado"
            };
            return res.status(484).json(responseError);
        }

        let alumno = await prisma.alumno.update({
            where: { id: camposValidados.id },
            data: camposValidados
        });

        // Respuesta exitosa con el alumno actualizado
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: alumno
        };
        return res.status(200).json(responseOk);  // Enviamos la respuesta con el código HTTP 200.
    } catch (error) {
        return handleZodError(res, error);  // Manejamos el error con la función auxiliar.
    }
});
