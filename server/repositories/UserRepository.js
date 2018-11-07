
var Users = require("../models").Users;
const UsersController = require('../controllers').UsersController;

var UserRepository = {

    createUser(params, res){
        Users.create(params)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(201).send(err));
    },

    listUsers(res){
        Users.findAll().then(l => res.status(200).send(l));    
    }

};

module.exports = UserRepository;


