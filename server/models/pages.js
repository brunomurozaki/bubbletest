'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pages = sequelize.define('Pages', {
    fb_id: DataTypes.STRING,
    name: DataTypes.STRING,
    tags: DataTypes.STRING,
    position: DataTypes.STRING(1)
  }, {});
  
  Pages.associate = function(models) {
    Pages.belongsToMany(models.Users, {
      through: 'PagesUsers',
      foreignKey: 'pages_id'
    });

  };
  return Pages;
};