import request from 'supertest'; // Asegúrate de tener 'supertest' instalado
import { app } from '../src/serve';

describe('Alumnos API', () => {
  it('Debería obtener la lista de alumnos', async () => {
    const response = await request(app).get('/api/alumno');
    expect(response.statusCode).toBe(200);
  });

  it('Debería crear un nuevo alumno', async () => {
    const newAlumno = { nombre: 'Juan Perez', matricula: '12345' };
    const response = await request(app).post('/api/alumno').send(newAlumno);
    expect(response.statusCode).toBe(200);
  });
});
