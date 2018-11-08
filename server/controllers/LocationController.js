
var LocationRepository = require("../repositories").LocationRepository;


module.exports = {
    create (req, res){
        console.log(req.body);
        console.log(req);
        LocationRepository.createLocation(req.body, res);
    },

    list(req, res){
        LocationRepository.listLocation(res);
    }
}
