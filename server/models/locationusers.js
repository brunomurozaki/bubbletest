'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationUsers = sequelize.define('LocationUsers', {
    location_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER
  }, {});
  LocationUsers.associate = function(models) {
    // associations can be defined here
  };
  return LocationUsers;
};