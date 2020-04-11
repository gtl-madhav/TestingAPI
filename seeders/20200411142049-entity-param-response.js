'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('entity_param_response', [{
      id: 1,
      entityWingRelationId: 1,
      entityId: 1,
      entityParamId: 1,
      entityParamResponse: 1,
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      entityWingRelationId: 1,
      entityId: 2,
      entityParamId: 2,
      entityParamResponse: 1,
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entity_param_response', null, {});
  }
};
