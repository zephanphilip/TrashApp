const express = require('express');

const {addItem,getPendingOrders, getAllPendingOrders, markOrderAsCollected,processOrder} = require('../controllers/orderController');

const router = express.Router();

router.post('/',addItem);

router.get('/pending/:userId',getPendingOrders);

router.get('/pending',getAllPendingOrders);

router.put('/:id/collect', markOrderAsCollected);

router.put('/:id/process', processOrder);


module.exports = router;