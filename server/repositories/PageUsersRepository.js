
var PageUserModel = require("../models").PagesUsers;
//const UsersController = require('../controllers').UsersController;

var PageUsersRepository = {

    createPageUsers(params, res){
        PageUserModel.create(params)
            .then(page => res.status(200).send(page))
            .catch(err => res.status(201).send(err));
    },

    listPageUsers(res){
        PageUserModel.findAll().then(l => res.status(200).send(l));    
    }

};

module.exports = PageUsersRepository;

