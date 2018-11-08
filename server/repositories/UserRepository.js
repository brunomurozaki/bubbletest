
var Users = require("../models").Users;
var Pages = require("../models").Pages;
var Location = require("../models").Location;


var UserRepository = {

    createUser(params, res){
        Users.create(params)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(201).send(err));
    },

    listUsers(res){
        Users.findAll({include: [Pages, Location]}).then(l => res.status(200).send(l));    
    }

};

module.exports = UserRepository;


