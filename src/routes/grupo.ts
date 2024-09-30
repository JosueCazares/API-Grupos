import { Router } from 'express';  // Importamos Router de Express
import type { Request, Response } from 'express';  // Importamos tipos para las peticiones y respuestas
import { prisma } from '../db';  // Importamos la instancia de Prisma
import type { APIResponse } from '../lib/types';  // Importamos el tipo de respuesta API
import { ZodGrupoObj, ZodGrupoIdObj } from '@/validation/ZodGrupo';  // Importamos los esquemas de validación
import { handleZodError } from '../lib/handleZodError';  // Importamos la función para manejar errores de Zod

export const router = Router();

// GET: Obtener todos los grupos
router.get('/', async (_: Request, res: Response) => {
    try {
        let grupos = await prisma.grupo.findMany();  // Obtener todos los grupos

        let responseOk: APIResponse<typeof grupos> = {
            status: 'success',
            data: grupos
        };
        return res.status(200).json(responseOk);  // Responder con los grupos
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// POST: Crear un nuevo grupo
router.post('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodGrupoObj.parse(req.body);  // Validar datos
        let grupo = await prisma.grupo.create({
            data: camposValidados
        });

        let responseOk: APIResponse<typeof grupo> = {
            status: 'success',
            data: grupo
        };
        return res.status(201).json(responseOk);  // Responder con el grupo creado
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// PUT: Actualizar un grupo
router.put('/', async (req: Request, res: Response) => {
    try {
        const camposValidados = ZodGrupoIdObj.parse(req.body);  // Validar datos
        let grupoExistente = await prisma.grupo.findUnique({
            where: { id: camposValidados.id },
        });

        if (!grupoExistente) {
            return res.status(404).json({
                status: 'error',
                error: 'Grupo no encontrado.'
            });
        }

        let grupoActualizado = await prisma.grupo.update({
            where: { id: camposValidados.id },
            data: camposValidados
        });

        let responseOk: APIResponse<typeof grupoActualizado> = {
            status: 'success',
            data: grupoActualizado
        };
        return res.status(200).json(responseOk);  // Responder con el grupo actualizado
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});

// DELETE: Eliminar un grupo
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;  // Obtener ID del grupo desde los parámetros de la URL
    try {
        let grupoEliminado = await prisma.grupo.delete({
            where: { id: Number(id) },
        });

        let responseOk: APIResponse<typeof grupoEliminado> = {
            status: 'success',
            data: grupoEliminado
        };
        return res.status(200).json(responseOk);  // Responder con el grupo eliminado
    } catch (error) {
        return handleZodError(res, error);  // Manejar errores
    }
});


