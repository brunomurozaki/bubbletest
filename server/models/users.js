'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    fb_id: DataTypes.STRING,
    fb_token: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    hometown: DataTypes.STRING,
    location: DataTypes.STRING,
    religion: DataTypes.STRING,
    politicalStand: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};