
var UsersFriendsModel = require("../models").UsersFriends;
//const UsersController = require('../controllers').UsersController;

var FriendsRepository = {

    createFriend(params, res){
        var opositeObj = {"user_id": params.friend_id, "friend_id": params.user_id};

        UsersFriendsModel.create(params)
            .then(f => UsersFriendsModel.create(opositeObj).then(n => res.send([f, n])));
    },

    listFriends(res){
        UsersFriendsModel.findAll()
            .then(l => res.send(l));
    }

};

module.exports = FriendsRepository;

