'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('entity_configuration', [{
      id: 1,
      entityId: 1,
      isWebDashboard: 1,
      webDisplayOrder: 1,
      isMobileDashboard: 1,
      mobileDisplayOrder: 1,
      canAddToWing: 1,
      isAssistEnabled: 1
    },
    {
      id: 2,
      entityId: 2,
      isWebDashboard: 1,
      webDisplayOrder: 2,
      isMobileDashboard: 1,
      mobileDisplayOrder: 2,
      canAddToWing: 0,
      isAssistEnabled: 0
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entity_configuration', null, {});
  }
};
