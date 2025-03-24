const request = require('supertest');
const app = require('../../index');
const { dbConnection } = require('../../database/config');

describe('API Calendar - Eventos', () => {
    let token;
    let eventId;

    beforeAll(async () => {
        await dbConnection();
        // Login para obtener token
        const loginResponse = await request(app)
            .post('/api/auth')
            .send({
                email: 'jose@google.com',
                password: '1234567'
            });
        token = loginResponse.body.token;
        // console.log(token);
    }, 10000);

    afterAll(async () => {
        // Por ahora removemos el disconnect ya que no tenemos esa función
        // Podemos agregar una función de limpieza después
    });

    test('debe obtener eventos', async () => {
        const response = await request(app)
            .get('/api/events')
            .set('x-token', token)
        expect(response.body.ok).toBe(true);
        expect(response.body.eventos).toBeInstanceOf(Array);
        expect(response.body.eventos.length).toBeGreaterThan(0);
    });

    test('GET /api/events debe requerir autenticación', async () => {
        const response = await request(app)
            .get('/api/events');

        expect(response.body).toHaveProperty('msg', 'No hay token en la petición');
    });

    test('POST /events crea un nuevo evento', async () => {
        const nuevoEvento = {
            title: 'Reunión importante',
            start: '2024-03-20',
            end: '2024-03-20',
            notes: 'Reunión de equipo'
        };

        const response = await request(app)
            .post('/api/events')
            .set('x-token', token)
            .send(nuevoEvento);

        eventId = response.body.evento.id;

        expect(response.body).toEqual({
            ok: true,
            evento: {
                id: expect.any(String),
                title: 'Reunión importante',
                start: expect.any(String),
                end: expect.any(String), 
                notes: 'Reunión de equipo',
                user: {
                    _id: expect.any(String),
                    name: expect.any(String)
                }
            }
        });
    });

    test('debe actualizar un evento', async () => {
        const response = await request(app)
            .put(`/api/events/${eventId}`)
            .set('x-token', token)
            .send({
                title: 'Evento Actualizado',
                start: new Date(),
                end: new Date(Date.now() + 3600000),
                notes: 'Notas actualizadas'
            });

        expect(response.body).toEqual({
            ok: true,
            evento: {
                title: 'Evento Actualizado',
                notes: 'Notas actualizadas', 
                start: expect.any(String),
                end: expect.any(String),
                user: expect.any(String),
                id: expect.any(String)
            }
        });
    });

    test('debe eliminar un evento', async () => {
        await request(app)
            .delete(`/api/events/${eventId}`)
            .set('x-token', token)
            .expect(200);
    });

    test('debe fallar al crear evento sin título', async () => {
        const response = await request(app)
            .post('/api/events')
            .set('x-token', token)
            .send({
                start: new Date(),
                end: new Date(Date.now() + 3600000)
            })
            .expect(400);

        expect(response.body).toHaveProperty('errors');
    });
}); 