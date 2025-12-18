const conectarDB = require('./psql-connection');
// Establece la conexión a la base de datos
const db = conectarDB();

function obtener_pedidos() {
    return db.any(`SELECT * FROM public.pedidos ORDER BY fecha_solicitud`)
}

module.exports = {
    obtener_pedidos,
}