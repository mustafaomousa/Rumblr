'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        title : "Audi's flagship",
        content : "https://i.ytimg.com/vi/htHQJ-pzr8Q/maxresdefault.jpg",
        body : "Audi's flagship sedan happens to be the massive A8L. In this pic it's powered by a twin scroll turbo V6.",
        makeId : 1,
        modelId : 1,
        userId : 1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
