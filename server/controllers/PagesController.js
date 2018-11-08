
var PagesRepository = require("../repositories").PagesRepository;


module.exports = {
    create (req, res){
        console.log(req.body);
        console.log(req);
        PagesRepository.createPage(req.body, res);
    },

    list(req, res){
        PagesRepository.listPages(res);
    }
}
