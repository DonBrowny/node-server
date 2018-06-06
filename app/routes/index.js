const noteRoutes = require('./note__routes');

module.exports = (app,db) => {
    noteRoutes(app,db);
};