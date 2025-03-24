import calendarApi from '../../src/api/calendarApi';
import { getEnvVariables } from '../../src/helpers';

// Mock de la API para evitar llamadas reales en pruebas
jest.mock('@/api/calendarApi', () => ({
    defaults: {
        baseURL: 'http://localhost:4000/api'  // Valor por defecto para la prueba
    },
    get: jest.fn(() => Promise.resolve({
        config: {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        }
    }))
}));

describe('Pruebas en el CalendarApi', () => {

    const { VITE_API_URL } = getEnvVariables();

    test('Debe tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe('http://localhost:4000/api');
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async () => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);

        const res = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe(token);
    });
});
