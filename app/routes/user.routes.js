module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  const authController = require('../controllers/auth.controller.js');

  app.post('/users', users.create);

  app.get('/users',authController.isAuthenticated,users.findAll);

  app.get('/users/:username', users.findOne);

  // app.put('/events/:eventId', events.update);

  // app.delete('/events/:eventId', events.delete);
}
