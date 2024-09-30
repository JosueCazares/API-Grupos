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
        // Validar los datos del request usando Zod
        const camposValidados = ZodAlumnoObj.parse(req.body);  // Validamos el body con Zod.

        // Primero, crea el alumno en la tabla Alumno
        let nuevoAlumno = await prisma.alumno.create({
            data: {
                nombre: camposValidados.nombre,
                matricula: camposValidados.matricula
            }
        });

        // Luego, crea la relación entre el alumno y el grupo en la tabla intermedia GrupoAlumno
        await prisma.grupoAlumno.create({
            data: {
                grupoId: camposValidados.grupoId,  // ID del grupo recibido en el request
                alumnoId: nuevoAlumno.id  // ID del alumno recién creado
            }
        });

        // Respuesta exitosa con el alumno recién creado
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: nuevoAlumno
        };
        return res.status(200).json(responseOk);  // Respuesta con código 200.
    } catch (error) {
        return handleZodError(res, error);  // Manejamos errores de validación Zod o cualquier otro error.
    }
});

// Ruta PUT: Actualiza un alumno existente
router.put('/', async (req: Request, res: Response) => {
    try {
        // Validamos los datos del request con Zod
        const camposValidados = ZodAlumnoIdObj.parse(req.body);

        // Buscamos al alumno por su ID
        let alumnoBusqueda = await prisma.alumno.findUnique({
            where: { id: camposValidados.id },  // Asegúrate de usar findUnique en lugar de findFirst para buscar por ID.
        });

        if (!alumnoBusqueda) {
            // Si no se encuentra el alumno, enviamos un error 404.
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Alumno no encontrado"
            };
            return res.status(404).json(responseError);
        }

        // Si el alumno existe, lo actualizamos
        let alumnoActualizado = await prisma.alumno.update({
            where: { id: camposValidados.id },
            data: {
                nombre: camposValidados.nombre,
                matricula: camposValidados.matricula,
                grupos: {
                    connect: { id: camposValidados.grupoId }  // Asegúrate de que el grupo exista antes de hacer la conexión
                }
            }
        });

        // Respuesta exitosa con el alumno actualizado
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: alumnoActualizado
        };
        return res.status(200).json(responseOk);  // Enviamos la respuesta con el código HTTP 200.
    } catch (error) {
        return handleZodError(res, error);  // Manejamos errores de validación Zod o cualquier otro error.
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificamos si el alumno existe
        let alumnoBusqueda = await prisma.alumno.findFirst({
            where: { id: Number(id) },
        });

        if (!alumnoBusqueda) {
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Alumno no encontrado"
            };
            return res.status(404).json(responseError);
        }

        // Eliminamos el alumno
        await prisma.alumno.delete({
            where: { id: Number(id) },
        });

        let responseOk: APIResponse<null> = {
            status: 'success',
            data: null
        };
        return res.status(200).json(responseOk);
    } catch (error) {
        console.error("Error al eliminar el alumno:", error);  // Mostrar el error en la consola
        return res.status(500).json({
            status: "error",
            error: "Error en el servidor"
        });
    }
});
