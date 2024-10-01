import { Router } from 'express';  // Importamos Router de Express
import type { Request, Response } from 'express';  // Importamos tipos para las peticiones y respuestas
import { prisma } from '../db';  // Importamos la instancia de Prisma
import type { APIResponse } from '../lib/types';  // Importamos el tipo de respuesta API
import { ZodCarreraObj, ZodCarreraIdObj } from '@/validation/ZodCarrera';  // Importamos los esquemas de validación
import { handleZodError } from '../lib/handleZodError';  // Importamos la función para manejar errores de Zod

export const router = Router();

// GET: Obtener todas las carreras
router.get('/', async (_: Request, res: Response) => {
    try {
        let carreras = await prisma.carrera.findMany();  // Obtener todas las carreras

        let responseOk: APIResponse<typeof carreras> = {
            status: 'success',
            data: carreras
        };
        return res.status(200).json(responseOk);  // Responder con las carreras
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// POST: Crear una nueva carrera
router.post('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodCarreraObj.parse(req.body);  // Validar datos
        let carrera = await prisma.carrera.create({
            data: camposValidados
        });

        let responseOk: APIResponse<typeof carrera> = {
            status: 'success',
            data: carrera
        };
        return res.status(201).json(responseOk);  // Responder con la carrera creada
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// PUT: Actualizar una carrera
router.put('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodCarreraIdObj.parse(req.body);  // Validar datos
        let carreraExistente = await prisma.carrera.findUnique({
            where: { id: camposValidados.id },
        });

        if (!carreraExistente) {
            return res.status(404).json({
                status: 'error',
                error: 'Carrera no encontrada.'
            });
        }

        let carreraActualizada = await prisma.carrera.update({
            where: { id: camposValidados.id },
            data: camposValidados
        });

        let responseOk: APIResponse<typeof carreraActualizada> = {
            status: 'success',
            data: carreraActualizada
        };
        return res.status(200).json(responseOk);  // Responder con la carrera actualizada
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// DELETE: Eliminar una carrera
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  // Obtener ID de la carrera desde los parámetros de la URL
    try {
        let carreraEliminada = await prisma.carrera.delete({
            where: { id: Number(id) },
        });

        let responseOk: APIResponse<typeof carreraEliminada> = {
            status: 'success',
            data: carreraEliminada
        };
        return res.status(200).json(responseOk);  // Responder con la carrera eliminada
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});
