
var LocationRepository = require("../repositories").LocationRepository;


module.exports = {
    create (req, res){
        LocationRepository.createLocation(req.body, res);
    },

    list(req, res){
        LocationRepository.listLocation(res);
    },

    async getLikesByLoc(req, res){
        var loc = await LocationRepository.getLocByFbId(req.params.id);
        LocationRepository.getLikesByLoc(loc.id, res);
    }
}
