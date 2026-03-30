const notFoundHandler = (req, _res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    details: err.details || null,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
