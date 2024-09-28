import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Alumno } from '@prisma/client';
import {ZodAlumnoObj, ZodAlumnoIdObj} from '@/validation/ZodAlumno'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let alumno = await prisma.alumno.findMany();

    let responseOk: APIResponse<Alumno[]> = {
        status: 'success',
        data: alumno
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodAlumnoObj.parse(req.body)    
        let alumno = await prisma.alumno.create({
            data: camposValidados
        });
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: alumno
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


router.put('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodAlumnoIdObj.parse(req.body)
        let alumnoBusqueda =await prisma.alumno.findFirst({}); 
        let alumno = await prisma.alumno.update({
            where : {id: camposValidados.id},
            data: camposValidados
        });
        let responseOk: APIResponse<Alumno> = {
            status: 'success',
            data: alumno
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