'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('facility_details', [{
      id: 1,
      name: 'Admin',
      facilityCode: "1234567890",
      address: "Dummy",
      city: "Ahmedabad",
      stateId: 1,
      countryId: 1,
      postalCode: "303030",
      phone: "1234567890",
      contactName: "Dummy",
      contactEmail: "Dummy",
      statusId: 1,
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('facility_details', null, {});
  }
};
