import { z } from 'zod';

export const ZodAlumnoObj = z.object({
  nombre: z.string(),
  matricula: z.string(),
  grupoId: z.number()
});

export const ZodAlumnoIdObj = z.object({
  id: z.number().positive().min(1),
  nombre: z.string(),
  matricula: z.string(),
  grupoId: z.number()
});
