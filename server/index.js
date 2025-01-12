'use strict';

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const router = require('./router.js');
const app = new Koa();

const PORT = process.env.SERVER_PORT || 3100;
const CORSCONFIG = {
  origin: 'http://localhost:3000',
  credentials: true,
};

require('./services/service.dispatcher.js');

app.use(cors(CORSCONFIG));
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
