
var PagesModel = require("../models").Pages;
//const UsersController = require('../controllers').UsersController;

var PagesRepository = {

    createPage(params, res){
        PagesModel.create(params)
            .then(page => res.status(200).send(page))
            .catch(err => res.status(201).send(err));
    },

    listPages(res){
        PagesModel.findAll().then(l => res.status(200).send(l));    
    }

};

module.exports = PagesRepository;

