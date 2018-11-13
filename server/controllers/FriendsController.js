
var FriendsRepository = require("../repositories").FriendsRepository;


module.exports = {
    create (req, res){
        FriendsRepository.createFriend(req.body, res);
    },

    list(req, res){
        FriendsRepository.listFriends(res);
    },
}
