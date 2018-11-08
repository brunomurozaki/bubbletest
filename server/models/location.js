'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    fb_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Users, {
      foreignKey: "location_id",
      sourceKey: "id"
    });
  };
  return Location;
};