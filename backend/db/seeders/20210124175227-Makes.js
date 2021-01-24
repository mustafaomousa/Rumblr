'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Makes', [
      { name: 'Audi' },
      { name: 'BMW' },
      { name: 'Mercedes' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Makes', null, {});
  }
};
