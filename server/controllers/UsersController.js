
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

    async getSummaryLikesById (req, res) {
        console.log("summary");
        var user = await UserRepository.getUserByFbID(req.params.id);
        var pages, ret = {left: 0, right: 0, neutral: 0, press: 0};
        if(!user){
            return res.status(404).send({});
        }

        pages = user.Pages;

        for(var i = 0; i < pages.length; i++){
            if(pages[i].position == 'L')
                ret.left++;
            else if(pages[i].position == 'R')
                ret.right++;
            else if(pages[i].position == 'P')
                ret.press++;
            else if(pages[i].position == 'N')
                ret.neutral++;
        }

        return res.status(200).send(ret);

    },

    async getLikesByAge(req, res){
        var birthday = new Date(req.params.birthday);
        var startDate = new Date("01/01/" + birthday.getFullYear());
        var endDate = new Date("12/31/" + birthday.getFullYear());
        var ret = {year: birthday.getFullYear(), left: 0, right: 0, neutral: 0, press: 0};

        var userList = await UserRepository.getAllUsersByDateInterval(startDate, endDate);

        for(var i = 0; i < userList.length; i++){
            var pages = userList[i].Pages;

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

        return res.status(200).send(ret);
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
