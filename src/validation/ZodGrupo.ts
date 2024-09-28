import { z } from 'zod';
import type { Grupo } from '@prisma/client';

export const ZodGrupoObj = z.object({
  nombre: z.string(),
  periodo: z.string(),
  carreraId: z.number(),  // Cambiado de z.int() a z.number()
  profesorId: z.number(), // Cambiado de z.int() a z.number()
});
