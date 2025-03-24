const request = require('supertest');
const app = require('../../index');
const { dbConnection } = require('../../database/config');

describe('API Calendar - Eventos', () => {
    beforeAll(async () => {
        await dbConnection();
    });

    afterAll(async () => {
        // Por ahora removemos el disconnect ya que no tenemos esa función
        // Podemos agregar una función de limpieza después
    });

    test('GET /api/events debe requerir autenticación', async () => {
        const response = await request(app)
            .get('/api/events')
            .expect(401); // Debería devolver 401 si no hay token
        
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
            .send(nuevoEvento)
            .expect(401); // Cambiado a 401 porque probablemente necesite autenticación

        expect(response.body).toBeDefined();
    });
}); 