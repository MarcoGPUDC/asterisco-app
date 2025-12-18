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

router.post('/add', async (req, res) => {
  try {
    const {name, device, motive, diagnostic, contact, email, observation, nroOrder} = req.body;
    const data = [name, device, motive, diagnostic, contact, email, observation, nroOrder]
    console.log(name, device, motive, diagnostic, contact, email, observation, nroOrder)
    res.status(201).json({ message: 'Creacion realizada', data: values});
  } catch (error) {
    console.error('Error al cargar los datos de pedido', error);
    res.status(500).send('Error al añadir solicitur');
  }
});

module.exports = router;