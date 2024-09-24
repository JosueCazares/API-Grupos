import { app } from './serve';
import {env} from './env'
//routes register

 import { router as example } from './routes/example';



app.use('/api/example',example);


app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})