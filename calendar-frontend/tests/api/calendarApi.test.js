import calendarApi from '../../src/api/calendarApi';
import { getEnvVariables } from '../../src/helpers';

describe('Pruebas en el CalendarApi', () => {

    const { VITE_API_URL } = getEnvVariables();

    test('debe teer la configucación por defecto ', () => {
        // console.log(VITE_API_URL);
        expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL)
    });

    test('debe de tener el x-token en el header de todas las peticiones', async () => {
        const token='ABC-123-XYZ';
        localStorage.setItem('token',token);
        const res= await calendarApi.get('/auth');
        expect(res.config.headers['x-token']).toBe(token);
    });
});