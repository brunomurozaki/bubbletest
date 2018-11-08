'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fb_id: DataTypes.STRING(50),
    gender: DataTypes.STRING(1),
    birthday: DataTypes.DATE
  }, {});
  Users.associate = function(models) {
    
    Users.belongsToMany(models.Pages, {
      through: 'PagesUsers',
      foreignKey: 'users_id'
    });


  };
  return Users;
};