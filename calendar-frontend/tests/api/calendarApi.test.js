import calendarApi from '../../src/api/calendarApi';

// Mock de la API para evitar llamadas reales en pruebas
jest.mock('../../src/api/calendarApi', () => ({
    defaults: {
        baseURL: 'http://localhost:4000/api'  // Valor por defecto para la prueba
    },
    get: jest.fn(() => Promise.resolve({
        config: {
            headers: {
                'x-token': 'mocked-token'  // Evita `localStorage.getItem('token')`
            }
        }
    }))
}));

describe('Pruebas en el CalendarApi', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('token', 'ABC-123-XYZ'); // Mock de localStorage antes de cada test
    });

    test('Debe tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe('http://localhost:4000/api');
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async () => {
        const res = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe('mocked-token');
    });
});
