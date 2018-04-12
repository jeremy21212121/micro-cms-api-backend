module.exports = (app) => {
  const users = require('../controllers/user.controller.js');

  app.post('/users', users.create);

  app.get('/users',users.findAll);

  // app.get('/events/:eventId', events.findOne);

  // app.put('/events/:eventId', events.update);

  // app.delete('/events/:eventId', events.delete);
}
