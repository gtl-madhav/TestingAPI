'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          firstname: "Harsh",
          lastname: "Machhoya",
          email: "admin@admin.com",
          phone: "8455293555",
          password: "admin",
          roleId: 1,
          statusId: 1,
          createdBy: 1,
          updatedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
