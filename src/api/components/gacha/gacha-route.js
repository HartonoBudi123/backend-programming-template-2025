const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.get('/history', gachaController.getGachaHistories);

  route.get('/history/:id', gachaController.getGachaHistory);

  route.get('/winners', gachaController.getGachaWinners);

  route.get('/prizes', gachaController.getAvailablePrizes);

  route.post('/roll', gachaController.createGacha);
};
