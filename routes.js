const nextRoutes = require('next-routes');

const routes = nextRoutes();

// name, pattern, page
routes.add('root', '/', 'home');
routes.add('form', '/form', 'form');
routes.add('callback', '/sessions/linkedin/callback', 'callback');
routes.add('nda', '/nda', 'nda');
routes.add('login', '/login', 'login');
routes.add('payment-form', '/payment-form', 'payment-form');
routes.add('success-message', '/success-message/:ndaId', 'success-message');

module.exports = routes;
