const express = require('express');
const router = express.Router();
const consulta = require('../js/psql-query');

router.get('/pedidos', async (req, res) => {
  try {
    const data = await consulta.obtener_pedidos();
    res.send(data);
  } catch (error) {
    console.error('Error al cargar los pedidos', error);
    res.status(500).send('Error al optener las opciones.');
  }
});

module.exports = router;