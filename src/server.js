/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import url from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import T from 'i18n-react';
import { Game } from './game';
import { NEW_GAME, validateGame } from './game/gameFromString';
import english from './i18n/en-GB.json';

T.setTexts(english);

const index = fs.readFileSync(path.join(__dirname, '../dist', 'index.html')).toString('utf-8');

const render = (value) => {
  const game = ReactDOMServer.renderToString(<main><Game value={value} /></main>);
  return index.replace('<main />', game);
};

const urlForNewGame = (query, others = {}) => url.format({
  pathname: `/${NEW_GAME}`,
  query: {
    ...query,
    ...others,
  },
});

const info = (req, res, next) => {
  console.log(req.originalUrl);
  next();
};

const validate = ({ params: { game }, query }, res, next) => {
  if (game === undefined) {
    res.redirect(urlForNewGame(query));
    res.end();
  } else {
    try {
      validateGame(game);
      next();
    } catch (error) {
      console.error(error);
      res.redirect(urlForNewGame(query, { error: error.message }));
      res.end();
    }
  }
};

const files = (...paths) => express.static(path.join(__dirname, ...paths), {
  index: false,
  maxAge: 36000000,
});

const handler = ({ params: { game } }, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(render(game));
};

const app = express();

app.use('/favicon.ico', info, files('../dist', 'favicon.ico'));

app.use('/public', info, files('../dist'));

app.get('/:game', info, validate, handler);

app.get('*', info, validate, handler);

export default app;

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`ready on: ${port}`));
}
