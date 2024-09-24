import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Example } from '@prisma/client';
import {ZodExampleObj} from '@/validation/ZodExample'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let examples = await prisma.example.findMany();

    let responseOk: APIResponse<Example[]> = {
        status: 'success',
        data: examples
    }

    return res.json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodExampleObj.parse(req.body)
        let example = await prisma.example.create({
            data: camposValidados
        });
        let responseOk: APIResponse<Example> = {
            status: 'success',
            data: example
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