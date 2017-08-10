'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fb_id: DataTypes.STRING,
    fb_token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};