'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "generic_status",
      [
        {
          id: 1,
          name: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Inactive",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Deleted",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("generic_status", null, {});
  }
};
