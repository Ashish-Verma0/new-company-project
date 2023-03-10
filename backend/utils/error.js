const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose dublicate error
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // WRONG JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid or try again`;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "jwt malformed") {
    const message = `no token`;
    err = new ErrorHandler(message, 401);
  }
  // JWT EXPIRE ERROR
  if (err.name === "TokenExpireError") {
    const message = `Json web token is Expire or try again`;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "Error") {
    const message = `something went wrong`;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "callback is not a function") {
    const message = `something went wrong`;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "TypeError") {
    const message = `something went wrong`;
    err = new ErrorHandler(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
