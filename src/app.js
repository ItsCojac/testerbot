const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./db');
const config = require('./config');
const apiRouter = require('./routes/api');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

sequelize.authenticate().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch((err) => {
  console.error('Unable to connect to PostgreSQL database:', err);
});

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
