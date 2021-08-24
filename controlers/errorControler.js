const ErrorHandler = require('../util/errHandler');

const handleCastErrorDB = (err) => {
  const msg = `Invalid ${err.path}: ${err.value}`;
  return new ErrorHandler(msg, 404);
};

const handDuplicateFieldDB = (err) => {
  // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const value = err.keyValue.name;
  const msg = `Duplicate Field value: '/${value}/' . Please use another value`;
  return new ErrorHandler(msg, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorHandler(msg, 400);
};

const handleJWTError = () =>
  new ErrorHandler('Invalid Token. Please log in again', 401);

const handleJWTExpirationError = () =>
  new ErrorHandler('Your token has expired! please log in again', 401);

const devError = (err, res) => {
  //Operational Error: expected errors
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

const prodError = (err, res) => {
  //Operational Error: expected errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming Error: unexpected Error
  } else {
    // Log error
    console.error('ERROR 💥', err);

    // Sending Generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!!',
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  const production = process.env.NODE_ENV;

  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (production) {
    let error = JSON.parse(JSON.stringify(err));
    console.log(error.name);
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handDuplicateFieldDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    if (err.name === 'TokenExpiredError') error = handleJWTExpirationError();
    prodError(error, res);
    console.log(error);
    console.log('Prod', error.massage);
  }
};
