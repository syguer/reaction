import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {unsubscribeAll} from 'universal/libs/micro-dispatcher';
import Store from 'universal/store';

import Container from 'universal/views/container';

import {startApplication} from 'universal/actions/application-action-creators';

const app = express();

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${state.title}</title>
        <link rel="stylesheet" href="/index.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section class="application">${content}</section>
      </body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `;
}

app.use(express.static('public'));

app.get('/*', (req, res) => {
  unsubscribeAll();

  const store = new Store();

  store.ready(() => {
    const content = renderToString(<Container store={store}/>);
    res.send(layout(content, store.getState()));
  });

  startApplication(req.path);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
