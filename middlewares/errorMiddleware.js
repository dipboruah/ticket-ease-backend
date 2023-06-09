const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.statusCode = status;
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
