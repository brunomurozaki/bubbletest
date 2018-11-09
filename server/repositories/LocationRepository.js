
var Location = require("../models").Location;
var Users = require("../models").Users;
var Pages = require("../models").Pages;
var UsersRepository = require("../repositories").UsersRepository;
//const UsersController = require('../controllers').UsersController;

var LocationRepository = {

    createLocation(params, res){
        Location.create(params)
            .then(loc => res.status(200).send(loc))
            .catch(err => res.status(201).send(err));
    },

    listLocation(res){
        Location.findAll({include: [Users]}).then(l => res.status(200).send(l));    
    },

    // proporcao dir-esq de likes em paginas de uma loc especifica
    getLikesByLoc(locId, res){
        Location.findByPk(locId, {include: [{model: Users, include: [Pages]}]})
            .then(l => calcLikes(l, res));
    }

};

function calcLikes(list, res){

    var pageList = {};
    var ret = {};
    var left = 0, right = 0, press = 0;
    var keys = [];
    var currUser, currPage;

    for(var i = 0; i < list.Users.length; i++){
        currUser = list.Users[i];

        for(var j = 0; j < currUser.Pages.length; j++){
            currPage = currUser.Pages[j];
            pageList[currPage.fb_id] = currPage.position;
        }
    }

    keys = Object.keys(pageList);

    for(var i = 0; i < keys.length; i++){
        if(pageList[keys[i]] == 'R'){
            right++;
        } else if (pageList[keys[i]] == 'L') {
            left++;
        } else if (pageList[keys[i]] == 'P') {
            press++;
        }
    }

    ret = {"left": left, "right": right, "press": press};

    res.status(200).send(ret);
}

module.exports = LocationRepository;


