
var UserRepository = require("../repositories").UserRepository;


module.exports = {
    create (req, res){
        UserRepository.createUser(req.body, res);
    },

    list(req, res){
        UserRepository.listUsers(res);
    }
}
