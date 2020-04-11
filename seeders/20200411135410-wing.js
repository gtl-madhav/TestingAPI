'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('wings', [{
      id: 1,
      facilityId: 1,
      name: 'A',
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('wings', null, {});
  }
};
