
var UserRepository = require("../repositories").UserRepository;


module.exports = {
    create (req, res){
        UserRepository.createUser(req.body, res);
    },

    list(req, res){
        UserRepository.listUsers(res);
    },

    async likesByUserId(req, res){
        var user = await UserRepository.getUserByFbID(req.params.id);

        if(!user){
            return res.status(404).send({});
        }

        return res.status(200).send(user.Pages);
    },

    async likesByGender(req, res){
        var currGender = req.params.gender.toLowerCase();
        var genderList = await UserRepository.getAllUsersByGender(currGender);
        var ret = {gender: currGender, left: 0, right: 0, press: 0, neutral: 0};

        for(var i = 0; i < genderList.length; i++){
            var pages = genderList[i].Pages;
            if(pages){
                for(var j = 0; j < pages.length; j++){
                    if(pages[j].position == 'L')
                        ret.left++;
                    else if(pages[j].position == 'R')
                        ret.right++;
                    else if(pages[j].position == 'P')
                        ret.press++;
                    else if(pages[j].position == 'N')
                        ret.neutral++;
                }
            }
        }

        return res.status(200).send(ret);
    }
}
