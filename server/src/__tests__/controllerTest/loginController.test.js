// Importa SuperTest y tu aplicación
import supertest from 'supertest';
import app from '../../app'; // Reemplaza '../app' con la ruta correcta a tu archivo de entrada de la aplicación

jest.setTimeout(10000);

describe('loginController', () => {
  test('Should call logInfo when login function is called', async () => {
    // Define los datos de prueba
    const userData = {
      email: 'example@example.com',
      password: 'correctpassword'
    };

    // Envía una solicitud HTTP al endpoint de login
    const response = await supertest(app)
      .post('/api/auth/log-in')
      .send({ user: userData });

    // Verifica que la solicitud se haya realizado con éxito
    expect(response.status).toBe(200);

    // Verifica que la respuesta contiene los datos esperados
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe('Login successful');
    expect(response.body.token).toBeDefined();

    // Aquí puedes agregar más verificaciones según sea necesario
  });
});
