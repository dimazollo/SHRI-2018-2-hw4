function errorHandler(req, res, next) {
  res
    .status(404)
    .send('<h1>Status: 404</h1><h2>Page not found</h2>');
}

module.exports = errorHandler;
