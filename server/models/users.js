'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fb_id: DataTypes.STRING(50),
    gender: DataTypes.STRING(1),
    birthday: DataTypes.DATE,
    location_id: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    
    Users.belongsToMany(models.Pages, {
      through: 'PagesUsers',
      foreignKey: 'users_id'
    });

    Users.belongsTo(models.Location, {
      foreignKey: "location_id",
      targetKey: "id"
    });
  };
  return Users;
};