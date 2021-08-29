const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const ErrorHandler = require('./util/errHandler');
const errControler = require('./controlers/errorControler');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/usersRouter');
const reviewRouter = require('./routes/reviewRouter');

const app = express();

//1) Global middleware

//set Security Http header
app.use(helmet());

//limit request to the same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

console.log(process.env.NODE_ENV);

//Body parser i.e reading data from the request body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NOSQl query injection
app.use(mongoSanitize());

//Data Sanitizatin against XSS attacks
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) Base Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(errControler);

module.exports = app;
