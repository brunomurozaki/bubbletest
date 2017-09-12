const User = require('../models').Users;
const Location = require('../models').Location;

module.exports = {
  create(req, res) {
	var location_id = req.body.location.id;
	return Location.findOne({where: 
		{
			$eq: 
			{
				id: location_id
			}
		}
	})
	.then(data => verifyLocation(data, params, res))
	.catch(error => errorHandle(error, res));	
  },
  list(req, res) {
	return User.all()
	.then(list => res.send(list))
	.catch(error => errorHandle(error, res));
  }
};

function verifyLocation(data, req, res){
	if(data != null){
		return createUser(req, res, data);
	}
	
	return Location.create({
		id: req.body.id,
		name: req.body.name
	})
	.then(loc => createUser(req, res, loc))
	.catch(error => errorHandle(error, res));
}

function createUser(req, res, locationInfo){
	return User
      .create({
        fb_id: req.body.fb_id,
		fb_token: req.body.fb_token,
		name: req.body.name,
		birthday: req.body.birthday,
		hometown: req.body.hometown,
		location: req.body.location,
		religion: req.body.religion,
		politicalStand: req.body.politicalStand
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
}