const usersController = require('../controllers').UsersController;
const locationController = require('../controllers').LocationController;
const pagesController = require('../controllers').PagesController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Filter Bubble API!',
  }));

  app.get('/api', (req, res) => res.status(200).send({
    message: "teste " + req.body,
  }));
  

  // User paths
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);

  // Location paths
  app.post('/api/location', locationController.create);
  app.get('/api/location', locationController.list);

  // Pages paths
  app.post('/api/pages', pagesController.create);
  app.get('/api/pages', pagesController.list);
};