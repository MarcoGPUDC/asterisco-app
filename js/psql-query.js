const conectarDB = require('./psql-connection');
// Establece la conexión a la base de datos
const db = conectarDB();
const types = require('pg').types;
types.setTypeParser(1082, val => val); // 1082 = DATE

function obtener_pedidos() {
    return db.any(`SELECT id,dispositivo,motivo,diagnostico,estado,contacto,email,observacion,nro_pedido,nombre,fecha_ingreso, fecha_entrega FROM public.pedidos ORDER BY fecha_ingreso`)
}

function añadir_pedido(dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre){
    return db.none(`
            INSERT INTO pedidos (dispositivo, motivo, diagnostico, estado, contacto, email, observacion, nro_pedido, nombre)
            VALUES ($1, $2, $3, 'pendiente' , $4, $5, $6, $7, $8)
        `,[dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre])
}

function modificar_pedido(dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre, id){
    return db.none(`
            UPDATE pedidos
            SET dispositivo=$1, motivo=$2, diagnostico=$3, contacto=$4, email=$5, observacion=$6, nro_pedido=$7, nombre=$8
            WHERE id=$9
        `,[dispositivo, motivo, diagnostico, contacto, email, observacion, nro_pedido, nombre, id])
}

function remover_pedido(id){
    return db.none(`
            DELETE FROM pedidos
            WHERE id=$1
        `,id)
}

module.exports = {
    obtener_pedidos,
    añadir_pedido,
    modificar_pedido,
    remover_pedido
}