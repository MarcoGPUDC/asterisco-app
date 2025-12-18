const pgp = require('pg-promise')();

function conectarDB() {
    // Configuración para la conexión a la base de datos
    console.log('conectando');
    const db = pgp({
        // Aquí puedes proporcionar la URL de conexión a tu base de datos
        connectionString: 'postgres://postgres:admin@localhost:5432/ateriscodb',
        // Otros parámetros de configuración, si es necesario
    });

    // Devuelve la instancia de la base de datos
    return db;
}

// Exporta la función conectarDB para que pueda ser utilizada en otros archivos
module.exports = conectarDB;
