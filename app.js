require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { isCelebrate } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { DB_ADRESS } = require('./config');
const { PORT_SERVER } = require('./config');
const ErrorMiss = require('./errors/errorMiss');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const app = express();

const corsOptions = {
  origin: 'http://www.mestoivanitskiy.tk',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/api', routes);

app.use((req, res, next) => {
  next(new ErrorMiss('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = isCelebrate(err) ? 422 : err.statusCode;
  res.status(status).send({ message: err.message });
});

app.listen(PORT_SERVER, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT_SERVER}`);
});
