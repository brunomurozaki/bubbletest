const usersController = require('../controllers').UsersController;
const locationController = require('../controllers').LocationController;
const pagesController = require('../controllers').PagesController;
const Pages = require('../models').Pages;
var yaml = require('js-yaml');
var fs   = require('fs');
var pagesData = require("../../public/js/feeds.json");

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Filter Bubble API!',
  }));

  app.get('/api', (req, res) => res.status(200).send({
    message: "teste " + req.body,
  }));
  
  app.get('/import', (req, res) => {
    //readImportantPages();
    var keys = Object.keys(pagesData);
    var tags;
    for(var i = 0; i < keys.length; i++){

      var tags = pagesData[keys[i]].tags != undefined ? pagesData[keys[i]].tags.join() : null;

      Pages.create({
        fb_id: pagesData[keys[i]].fb_id,
        name: keys[i],
        tags: tags,
        position: getPosition(pagesData[keys[i]].tags)
      });
    }

    Pages.findAll().then(l => res.status(200).send(l));

  });

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

function getPosition(tagsArray){

  if(!tagsArray)
  {
    return 'N';
  }
    

  for(var i = 0; i < tagsArray.length; i++){
    if(tagsArray[i] == 'Direita' || tagsArray[i] == 'anti-PT'){
      return 'R';
    } 
    else if(tagsArray[i] == 'Esquerda' || tagsArray[i] == 'anti-antiPT'){
        return 'L';
    }
    else if(tagsArray[i] == 'Grande Imprensa' || tagsArray[i] == 'Jornais Digitais' || tagsArray[i] == 'Jornais Impressos' || tagsArray[i] == 'Televisão')
    {
      return 'P';
    }
  }

  return 'N';
}