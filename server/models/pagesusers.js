'use strict';
module.exports = (sequelize, DataTypes) => {
  const PagesUsers = sequelize.define('PagesUsers', {
    pages_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER
  }, {});
  PagesUsers.associate = function(models) {
    // associations can be defined here
  };
  return PagesUsers;
};