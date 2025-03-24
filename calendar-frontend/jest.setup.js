// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
//* Install yarn add -D dotenv
require('dotenv').config({
    path: '.env.test'
});

// Realizar el mock completo de las variables de entorno
jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ VITE_API_URL: 'http://localhost:4000/api' })
}));

// Configuración de Jest para React
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
