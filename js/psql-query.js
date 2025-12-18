const conectarDB = require('./psql-connection');
// Establece la conexión a la base de datos
const db = conectarDB();

function obtener_pedidos() {
    return db.any(`SELECT * FROM public.pedidos ORDER BY fecha_ingreso`)
}

function añadir_pedido(dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre){
    return db.none(`
            INSERT INTO pedidos (dispositivo, motivo, diagnostico, estado, contacto, email, observacion, nro_pedido, nombre)
            VALUES ($1, $2, $3, "pendiente" , $4, $5, $6, $7, $8)
        `,[dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre])
}

module.exports = {
    obtener_pedidos,
    añadir_pedido
}