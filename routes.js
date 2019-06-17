const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('root', '/', 'home');
routes.add('callback', '/sessions/linkedin/callback', 'callback');

module.exports = routes;
