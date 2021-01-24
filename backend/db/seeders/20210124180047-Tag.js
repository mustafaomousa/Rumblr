'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { name: 'Fast' },
      { name: 'Cool' },
      { name: 'Fancy' },
      { name: 'Boring' },
      { name: 'Eco-friendly' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
