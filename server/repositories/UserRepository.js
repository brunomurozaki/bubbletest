
var Users = require("../models").Users;
var Pages = require("../models").Pages;
var Location = require("../models").Location;


var UserRepository = {

    createUser(params, res){
        var loc_fb_id = params.loc_fb_id;

        if(loc_fb_id) {
            Location.findOne({where: {"fb_id": loc_fb_id}})
                .then(l => {
                    var obj = params;
                    obj["location_id"] = l.id;

                    Users.create(obj)
                        .then(user => res.status(201).send(user))
                        .catch(err => res.status(200).send(err));
                });
        }
        else {
            delete params.loc_fb_id;
            Users.create(params)
                .then(user => res.status(201).send(user))
                .catch(err => res.status(200).send(err));
        }
    },

    listUsers(res){
        Users.findAll({include: [{model: Pages}, {model: Location}, {model: Users, as: "Friend"}]}).then(l => res.status(200).send(l));    
    },

    async getUserByFbID(fbId){
        return await Users.findOne({where: {fb_id: fbId}, include: [Pages]});
    },

    async getAllUsersByGender(genderLetter){
        return await Users.findAll({where: {gender: genderLetter}, include: [Pages]});
    },

    async getAllUsersByDateInterval(startDate, endDate){
        return await Users.findAll({where: {birthday: {$between: [startDate, endDate]}}, include:[Pages]});
    }

};

module.exports = UserRepository;


