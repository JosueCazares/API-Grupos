import { app } from './serve';                          // Configuración del servidor
import { env } from './env';                            // Variables de entorno

import { router as carrera } from './routes/carrera';   // Rutas de carrera
import { router as grupo } from './routes/grupo';       // Rutas de grupo
import { router as alumno } from './routes/alumno';     // Rutas de alumno

// Registra las rutas en el servidor
app.use('/api/carrera', carrera);
app.use('/api/grupo', grupo);
app.use('/api/alumno', alumno);

// Inicia el servidor en el puerto especificado
app.listen(env.PORT, () => {
    console.log(`API-GRUPOS iniciada en el puerto ${env.PORT}`);
});
