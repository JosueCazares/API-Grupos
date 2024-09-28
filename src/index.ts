import { app } from './serve';
import {env} from './env'
//routes register

 import { router as carrera } from './routes/carrera';
 import { router as grupo } from './routes/grupo';
 import { router as alumno } from './routes/alumno';
 

app.use('/api/carrera',carrera);
app.use('/api/grupo',grupo);
app.use('/api/alumno',alumno);

app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})