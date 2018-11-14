'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  queryInterface.addConstraint('Users', ['fb_id'], {
      type: 'unique',
      name: 'unique_user_fb_id'
  });

  queryInterface.addConstraint('Pages', ['fb_id'], {
    type: 'unique',
    name: 'unique_page_fb_id'
  });

  queryInterface.addConstraint('Locations', ['fb_id'], {
    type: 'unique',
    name: 'unique_loc_fb_id'
  });

  queryInterface.addConstraint('PagesUsers', ['pages_id', 'users_id'], {
    type: 'unique',
    name: 'unique_page_user_fb_id'
  });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
