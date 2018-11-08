
var LocationModel = require("../models").Location;
//const UsersController = require('../controllers').UsersController;

var LocationRepository = {

    createLocation(params, res){
        LocationModel.create(params)
            .then(loc => res.status(200).send(loc))
            .catch(err => res.status(201).send(err));
    },

    listLocation(res){
        LocationModel.findAll().then(l => res.status(200).send(l));    
    }

};

module.exports = LocationRepository;


