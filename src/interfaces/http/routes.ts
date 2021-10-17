import express, { Router } from 'express';
import url from 'url';

import TicTacToeController from './ticTacToe/TicTacToeController';

const routes = (): Router => {
  const api = Router();

  api.use(express.json());

  api.use((req, _, next) => {
    req.url = decodeURIComponent(req.url);
    req.query = url.parse(req.url, true).query;
    next();
  });

  api.use('/', TicTacToeController());

  api.all('*', (req, res) => {
    res.status(404).send('Not Found');
  });

  return api;
};

export default routes;
