'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user_roles",
      [
        {
          id: 1,
          name: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Facility Admin",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_roles", null, {});
  }
};
