'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('entity_parameters', [{
      id: 1,
      entityId: 1,
      parameter: "Occupied",
      isAlert: 0,
      alertValue: 0,
      alertDisplayOrder: 1,
      paramDisplayOrder: 1,
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      entityId: 2,
      parameter: "On Ventilator",
      isAlert: 1,
      alertValue: 1,
      alertDisplayOrder: 1,
      paramDisplayOrder: 1,
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entity_parameters', null, {});
  }
};
