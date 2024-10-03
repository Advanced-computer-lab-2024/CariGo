const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token , please log in again', 401);
const handleTokenExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);


const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperatinal) {
    //Operational trusted error  , send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or unknow error, don't leak details to client

    //1)log error
    console.error('ERROR 💥😶‍🌫️', err);

    //2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong, please try again later.❌',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    console.log(err.name);

    if (error.name === 'CastError') {
        error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
         error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError'){
      error = handleValidationErrorDB(error);
    }
    if (error.name ===  'JsonWebTokenError'){
      error = handleJWTError(error);
    }
    if (error.name ===  'TokenExpiredError'){
      error = handleTokenExpiredError(error);
    }
    sendErrorProd(error, res);
  }
};
