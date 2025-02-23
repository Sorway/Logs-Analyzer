const routes = require('express').Router();
const logController = require('./controllers/logController');
const statsController = require('./controllers/statsController');
const authController = require('./controllers/authController');
const { redirectIfNotAuthenticated, redirectIfAuthenticated } = require('./middleware/authentication');

routes.get('/', redirectIfNotAuthenticated, logController.showLogs);
routes.post('/upload', redirectIfNotAuthenticated, logController.uploadLog);
routes.get('/stats', redirectIfNotAuthenticated, statsController.showStats);

/* Authentication */
routes.get('/login', redirectIfAuthenticated, authController.showLogin);
routes.post('/login', redirectIfAuthenticated, authController.login);
routes.get('/register', redirectIfAuthenticated, authController.showRegister);
routes.post('/register', redirectIfAuthenticated, authController.register);
routes.get('/logout', authController.logout);

/* Redirections */

routes.get('/redirect-jonathan', (req, res) =>
    res.redirect('https://jonathan-gp.fr')
);

routes.get('/redirect-alain', (req, res) =>
    res.redirect('https://alain-molinari.gigordz.fr')
);

module.exports = routes;