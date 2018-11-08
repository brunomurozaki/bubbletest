
var Location = require("../models").Location;
var Users = require("../models").Users;
//const UsersController = require('../controllers').UsersController;

var LocationRepository = {

    createLocation(params, res){
        Location.create(params)
            .then(loc => res.status(200).send(loc))
            .catch(err => res.status(201).send(err));
    },

    listLocation(res){
        Location.findAll({include: [Users]}).then(l => res.status(200).send(l));    
    }

};

module.exports = LocationRepository;


