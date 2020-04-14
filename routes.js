const nextRoutes = require('next-routes');

const routes = nextRoutes();

// name, pattern, page
routes.add('callback', '/sessions/linkedin/callback', 'callback');

routes.add('root', '/', 'home');
routes.add('nda-new', '/nda/new', 'sender-form');
routes.add('nda-compose', '/nda/compose', 'sender-nda');
routes.add('nda-pay', '/nda/pay', 'payment-form');
routes.add('nda-sent', '/nda/sent-:ndaId', 'success-message');

routes.add('nda-preview', '/nda/:ndaId/preview', 'recipient-nda');


routes.add('login', '/login', 'login');

routes.add('dashboard', '/dashboard/:dashboardType', 'dashboard');
routes.add('dashboard-nda', '/nda/:ndaId', 'nda');

module.exports = routes;
