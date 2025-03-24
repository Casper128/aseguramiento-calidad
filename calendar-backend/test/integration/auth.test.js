const request = require('supertest');
const app = require('../../index');
const { dbConnection } = require('../../database/config');

describe('Auth API', () => {
    let testUser = {
        name: 'Usuario Test',
        email: `test${Date.now()}@test.com`,
        password: '123456'
    };

    let responseCreateUser;

    beforeAll(async () => {
        await dbConnection();
        // Crear un usuario solo una vez
        responseCreateUser = await request(app)
            .post('/api/auth/new')
            .send(testUser);
    }, 30000);

    describe('Login - POST /api/auth', () => {
        test('debe hacer login con credenciales correctas', async () => {
            const response = await request(app)
                .post('/api/auth')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            // console.log(response.body);
            expect(response.body).toHaveProperty('ok', true);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('uid');
            expect(response.body).toHaveProperty('name', testUser.name);
        });

        test('debe fallar con email incorrecto', async () => {
            const response = await request(app)
                .post('/api/auth')
                .send({
                    email: 'noexiste@test.com',
                    password: '123456'
                })
                .expect(400);

            expect(response.body).toHaveProperty('msg', 'El usuario no existe con ese email');
        });


        test('debe fallar con contraseña incorrecta', async () => {
            const response = await request(app)
                .post('/api/auth')
                .send({
                    email: testUser.email,
                    password: 'contraseñaincorrecta'
                })
                .expect(400);
            expect(response.body).toHaveProperty('msg', 'Password incorrecto');
        });
    });


    describe('Renew Token - GET /api/auth/renew', () => {
        test('debe renovar token con token válido', async () => {
            console.log(responseCreateUser?.body);
            const response = await request(app)
                .get('/api/auth/renew')
                .set('x-token', responseCreateUser?.body?.token)
            // .expect(200);
            console.log(response.body);
            expect(response.body).toHaveProperty('ok', true);
            expect(response.body).toHaveProperty('token');
        });

        test('debe fallar sin token', async () => {
            const response = await request(app)
                .get('/api/auth/renew')
                .expect(401);

            expect(response.body).toHaveProperty('msg', 'No hay token en la petición');
        });

        test('debe fallar con token inválido', async () => {
            const response = await request(app)
                .get('/api/auth/renew')
                .set('x-token', 'token-invalido')
                .expect(401);

            expect(response.body).toHaveProperty('msg', 'Token no válido');
        });
    });
});
