import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Grupo } from '@prisma/client';
import {ZodGrupoObj} from '@/validation/ZodGrupo'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let Grupo = await prisma.grupo.findMany();

    let responseOk: APIResponse<Grupo[]> = {
        status: 'success',
        data: Grupo
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodGrupoObj.parse(req.body)
        let grupo = await prisma.grupo.create({
            data: camposValidados
        });
        let responseOk: APIResponse<Grupo> = {
            status: 'success',
            data: grupo
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});