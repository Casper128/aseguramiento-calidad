import calendarApi from '../../src/api/calendarApi';
import { getEnvVariables } from '../../src/helpers';
import MockAdapter from 'axios-mock-adapter';

describe('Pruebas en el CalendarApi', () => {

    test('debe tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe('http://localhost:4000/api');
    });

    test('debe de tener el x-token en el header de todas las peticiones', async () => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);

        // Crear el mock para interceptar peticiones en calendarApi
        const mock = new MockAdapter(calendarApi);
        // Simula una respuesta exitosa para GET /auth
        mock.onGet('/auth').reply(200, { message: 'ok' });

        const res = await calendarApi.get('/auth');

        // Verifica que en la configuración de la petición se haya incluido el token
        expect(res.config.headers['x-token']).toBe(token);

        // Limpia el mock después de la prueba
        mock.restore();
    });
});
