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

router.get('/pedidosTodos', async (req, res) => {
  try {
    const data = await consulta.obtener_pedidos_todos();
    res.send(data);
  } catch (error) {
    console.error('Error al cargar los pedidos', error);
    res.status(500).send('Error al optener las opciones.');
  }
});

router.post('/add', async (req, res) => {
  try {
    const {name, device, motive, diagnostic, contact, email, observation, nroOrder} = req.body;
    const result = await consulta.añadir_pedido(device, motive, diagnostic, contact, email, observation, nroOrder, name)
    res.status(201).json({ message: 'Creacion realizada', data: `Nombre: ${name}, Dispositivo: ${device} serverMsg:${result}`});
  } catch (error) {
    console.error('Error al cargar los datos de pedido', error);
    res.status(500).send('Error al añadir solicitur');
  }
});

router.post('/update', async (req, res) => {
  try {
    const {name, device, motive, diagnostic, contact, email, observation, nroOrder, id} = req.body;
    const result = await consulta.modificar_pedido(device, motive, diagnostic, contact, email, observation, nroOrder, name, id)
    res.status(201).json({ message: 'Creacion realizada', data: `Nombre: ${name}, Dispositivo: ${device}`});
  } catch (error) {
    console.error('Error al cargar los datos de pedido', error);
    res.status(500).send('Error al añadir solicitur');
  }
});

router.post('/remove', async (req, res) => {
  try {
    const {itemId} = req.body;
    const result = await consulta.remover_pedido(itemId)
    res.status(201).json({ message: 'removida realizada', data: `Identificador de Pedido: ${itemId}`});
  } catch (error) {
    console.error('Error al cargar los datos de pedido', error);
    res.status(500).send('Error al añadir solicitur');
  }
});

router.post('/send', async (req, res) => {
  try {
    const {itemId} = req.body;
    const result = await consulta.finalizar_pedido(itemId);
    res.status(201).json({ message: 'removida realizada', data: `Identificador de Pedido: ${itemId}`});
  } catch (error) {
    console.error('Error al cargar los datos de pedido', error);
    res.status(500).send('Error al añadir solicitur');
  }
});

module.exports = router;