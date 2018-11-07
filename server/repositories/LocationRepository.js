
var LocationModel = require("../models").Location;
//const UsersController = require('../controllers').UsersController;

var UserRepository = {

    createUser(params, res){
        LocationModel.create(params)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(201).send(err));
    },

    listUsers(res){
        LocationModel.findAll().then(l => res.status(200).send(l));    
    }

};

module.exports = UserRepository;


