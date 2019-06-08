const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('root', '/', 'home');

module.exports = routes;
