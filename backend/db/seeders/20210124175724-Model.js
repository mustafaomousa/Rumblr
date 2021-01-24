'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Models', [
      {
        name: 'A8',
        makeId: 1
      },
      {
        name: 'RS7',
        makeId: 1
      },
      {
        name: 'S5 Sportback',
        makeId: 1
      },
      {
        name: '750i',
        makeId: 2
      },
      {
        name: 'M340i',
        makeId: 2
      },
      {
        name: 'AMG GT63/GT63s',
        makeId: 3
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Models', null, {});
  }
};
