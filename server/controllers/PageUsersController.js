
var PageUsersRepository = require("../repositories").PageUsersRepository;
var PagesRepository = require("../repositories").PagesRepository;
var UserRepository = require("../repositories").UserRepository;
var Pages = require("../models").Pages;

module.exports = {
    async create (req, res)
    {
        var obj = req.body;
        var user;
        var page = await PagesRepository.findPageById(obj.pages_id);

        if(!page || !Object.keys(page).length)
        {
            return res.status(200).send({});
        }

        obj.pages_id = page.id;

        if(obj.users_fb_id){
            user = await UserRepository.getUserByFbID(obj.users_fb_id);
            obj["users_id"] = user.id;
            delete obj.users_fb_id;
        }

        return PageUsersRepository.createPageUsers(obj, res);
    },

    list(req, res)
    {
        PageUsersRepository.listPageUsers(res);
    }
}
