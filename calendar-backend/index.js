const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//comodin para no confundir las rutas del frontend con las del backend
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Escuchar peticiones solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`);
    });
}

module.exports = app;