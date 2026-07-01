// middleware/errorHandler.js — centralized "not found" and error handling.

// 1) notFound: runs when NO route matched the request (an unknown URL).
//    We register this AFTER all routes, so reaching it means "nothing matched".
export function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// 2) errorHandler: the central error desk. Express recognizes it as an error
//    handler ONLY because it has FOUR parameters: (err, req, res, next).
//    Any error thrown in a route (or forwarded by Express 5) ends up here.
export function errorHandler(err, req, res, next) {
  // Mongoose threw a CastError -> the id in the URL was malformed (e.g. "abc").
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }

  // Mongoose threw a ValidationError -> the data broke a schema rule
  // (e.g. missing required "name", or a negative price).
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Duplicate key (e.g. registering an email that already exists) -> Mongo code 11000.
  if (err.code === 11000) {
    return res.status(409).json({ error: "That value is already in use." });
  }

  // Otherwise: use a status code we attached on purpose (e.g. 404), else 500.
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
}
