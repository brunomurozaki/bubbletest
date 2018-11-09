
var PageUsersRepository = require("../repositories").PageUsersRepository;


module.exports = {
    create (req, res){
        console.log(req.body);
        console.log(req);
        PageUsersRepository.createPageUsers(req.body, res);
    },

    list(req, res){
        PageUsersRepository.listPageUsers(res);
    }
}
