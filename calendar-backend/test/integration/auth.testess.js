const request = require('supertest');
const app = require('../../index');
const { dbConnection } = require('../../database/config');

describe('Auth API', () => {
    beforeAll(async () => {
        await dbConnection();
    });

    // describe('Register - POST /api/auth/new', () => {
    //     const newUser = {
    //         name: 'Usuario Test',
    //         email: `test${Date.now()}@test.com`,
    //         password: '123456'
    //     };

    //     test('debe registrar un nuevo usuario', async () => {
    //         const response = await request(app)
    //             .post('/api/auth/new')
    //             .send(newUser)
    //             .expect(201);

    //         expect(response.body).toHaveProperty('ok', true);
    //         expect(response.body).toHaveProperty('token');
    //         expect(response.body).toHaveProperty('uid');
    //         expect(response.body).toHaveProperty('name', newUser.name);
    //     });

    //     test('debe fallar si el email ya existe', async () => {
    //         const response = await request(app)
    //             .post('/api/auth/new')
    //             .send(newUser)
    //             .expect(400);

    //         expect(response.body).toHaveProperty('msg', 'El usuario ya existe');
    //     });

    //     test('debe fallar si faltan campos requeridos', async () => {
    //         const response = await request(app)
    //             .post('/api/auth/new')
    //             .send({
    //                 email: 'incompleto@test.com'
    //             })
    //             .expect(400);

    //         expect(response.body).toHaveProperty('errors');
    //     });

    //     test('debe fallar si la contraseña es muy corta', async () => {
    //         const response = await request(app)
    //             .post('/api/auth/new')
    //             .send({
    //                 name: 'Test User',
    //                 email: 'test123@test.com',
    //                 password: '1234567' // Contraseña muy corta
    //             })
    //             .expect(400);

    //         expect(response.body).toHaveProperty('errors');
    //     });
    // });

    describe('Login - POST /api/auth', () => {
        test('debe hacer login con credenciales correctas', async () => {
            const response = await request(app)
                .post('/api/auth')
                .send({
                    email: 'test1742789171926@test.com',
                    password: '123456'
                })
                .expect(200);

            expect(response.body).toHaveProperty('ok', true);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('uid');
            expect(response.body).toHaveProperty('name');
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
                    email: 'test@test.com',
                    password: 'contraseñaincorrecta'
                })
                .expect(400);

            expect(response.body).toHaveProperty('msg', 'El usuario no existe con ese email');
        });
    });

    describe('Renew Token - GET /api/auth/renew', () => {
        let token;

        beforeAll(async () => {
            // Obtener token válido antes de las pruebas
            const loginResponse = await request(app)
                .post('/api/auth')
                .send({
                    email: 'test@test.com',
                    password: '123456'
                });
            token = loginResponse.body.token;
        });

        test('debe renovar token con token válido', async () => {
            const response = await request(app)
                .get('/api/auth/renew')
                .set('x-token', token)
                .expect(200);

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