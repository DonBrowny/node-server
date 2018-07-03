const noteRoutes = require('./api_routes');

module.exports = (app, db) => {
    noteRoutes(app, db);
};