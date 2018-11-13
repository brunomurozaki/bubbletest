'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersFriends = sequelize.define('UsersFriends', {
    user_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER
  }, {});
  UsersFriends.associate = function(models) {
    // associations can be defined here
  };
  return UsersFriends;
};