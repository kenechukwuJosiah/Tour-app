const express = require('express');
const morgan = require('morgan');
const ErrorHandler = require('./util/errHandler');
const errControler = require('./controlers/errorControler');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/usersRouter');

const app = express();

console.log(process.env.NODE_ENV);
// console.log(process.env);

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new ErrorHandler(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(errControler);

module.exports = app;
