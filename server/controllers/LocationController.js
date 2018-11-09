
var LocationRepository = require("../repositories").LocationRepository;


module.exports = {
    create (req, res){
        LocationRepository.createLocation(req.body, res);
    },

    list(req, res){
        LocationRepository.listLocation(res);
    },

    getLikesByLoc(req, res){
        LocationRepository.getLikesByLoc(req.params.id, res);
    }
}
