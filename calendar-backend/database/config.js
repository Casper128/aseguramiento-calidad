const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect(process.env.DB_CNN || "mongodb+srv://darwinosorio286:1017230626@calendar-db.umlxspn.mongodb.net/?retryWrites=true&w=majority&appName=calendar-db", {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }
};

module.exports = {
    dbConnection
};
