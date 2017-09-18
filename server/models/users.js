'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    fb_id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
    fb_token:DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    hometown: {
	  type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Location',
        key: 'id'
      }
	},
    location: {
	  type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Location',
        key: 'id'
      }
	},
    religion: DataTypes.STRING,
    politicalStand: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasOne(models.Location, {
			foreignKey: 'hometown',
			as: 'hometown_location'
		});
		
		Users.hasOne(models.Location, {
			foreignKey: 'location',
			as: 'location_location'
		});
      }
    }
  });
  return Users;
};