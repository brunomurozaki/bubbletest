const User = require('../models').Users;
const Location = require('../models').Locations;

module.exports = {
  create(req, res) {
	
	if(req.body.location)
	{
		var location_id = req.body.location.id;
	
		console.log("Creating...");
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
	} 
	else 
	{
		return createUser(req, res);
	}
	
	
  },
  list(req, res) {
	console.log("GET");
	return User.all()
	.then(list => res.send(list))
	.catch(error => errorHandle(error, res));
  }
};

function verifyLocation(data, req, res){
	console.log("Verifying...");
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
	console.log("Finishing...");
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