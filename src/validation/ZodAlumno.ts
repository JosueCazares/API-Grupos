import {z} from 'zod'
import  type {Grupo} from '@prisma/client'


export const ZodAlumnoObj = z.object({
  nombre  : z.string(),
  grupoId : z.number(),
  periodo : z.string(),
})

export const ZodAlumnoIdObj = z.object({
  id : z.number().positive().min(1),
  nombre  : z.string(),
  grupoId : z.number(),
  periodo : z.string(),
})