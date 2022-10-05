require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const rateLimiter = require('./middlewares/rateLimiter');
const { NODE_ENV, PORT, MONGO_URI } = require('./utils/constants');
const { MONGO_URI_DEV } = require('./utils/config');

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(requestLogger);

// app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGO_URI : MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

main();
