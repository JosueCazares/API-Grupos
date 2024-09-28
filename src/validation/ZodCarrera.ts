import {z} from 'zod'
import  type {Grupo} from '@prisma/client'


export const ZodCarreraObj = z.object({
  nombre : z.string(),
  //grupos : z.enum({Grupo})  
})