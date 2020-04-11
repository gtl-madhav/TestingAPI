'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('entity_wing_relation', [{
      id: 1,
      facilityId: 1,
      identityId: 1,
      entityId: 1,
      entityName: "A001",
      wingId: 1,
      assistAlert: 0,
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entity_wing_relation', null, {});
  }
};
