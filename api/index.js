const app = require('../backend/server');

// Vercel expects a default export of (req, res) => ...
// Express apps work directly as Vercel serverless handlers
module.exports = (req, res) => {
  // Ensure the app handles the request
  app(req, res);
};
