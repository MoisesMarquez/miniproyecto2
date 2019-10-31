const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api',routes);

module.exports = app;