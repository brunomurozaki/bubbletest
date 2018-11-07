
var UserRepository = require("../repositories").UserRepository;


module.exports = {
    create (req, res){
        console.log(req.body);
        console.log(req);
        UserRepository.createUser(req.body, res);
    },

    list(req, res){
        UserRepository.listUsers(res);
    }
}
