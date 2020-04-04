const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('root', '/', 'home');
routes.add('form', '/form', 'form');
routes.add('callback', '/sessions/linkedin/callback', 'callback');
routes.add('nda', '/nda', 'nda');
routes.add('login', '/login', 'login');
routes.add('payment-form', '/payment-form', 'payment-form');

module.exports = routes;
