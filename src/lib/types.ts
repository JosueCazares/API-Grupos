// Importamos los tipos Carrera, Alumno y Grupo del cliente de Prisma.
import type {
    Carrera,
    Alumno,
    Grupo
} from '@prisma/client';

// Definiciones de los tipos que se usan en las respuestas de la API

// APIResponse representa la estructura de una respuesta de la API. Puede contener datos o un error.
export type APIResponse<T> = {
    status: 'success' | 'error',  // El estado de la respuesta, puede ser 'success' o 'error'.
    data?: T,  // Los datos devueltos por la API, de tipo genérico T.
    error?: unknown  // Un posible error, que puede ser cualquier tipo de dato.
}

// LoginResponseData contiene los datos devueltos al usuario tras un inicio de sesión exitoso.
export interface LoginResponseData {
    rol: string;  // El rol del usuario (ej. 'admin', 'alumno', etc.)
    id: string;  // El ID del usuario.
    username: string;  // El nombre de usuario.
}

// Exportamos estos tipos para su uso en otros archivos.
export type {
    Carrera,
    Alumno,
    Grupo
};
