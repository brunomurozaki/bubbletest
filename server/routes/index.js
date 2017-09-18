const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Filter Bubble API!',
  }));

  app.get('/api', (req, res) => res.status(200).send({
    message: "teste " + req.body,
  }));
  
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
};