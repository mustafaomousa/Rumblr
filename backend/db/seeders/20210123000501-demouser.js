'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'demo-user',
        email: 'demo@user.io',
        header: 'Do you ever feel... like a plastic bag... drifting through the wind...',
        bio: "I'm just a silly coder from silly ol'Texas! Thank you for using my app.",
        profilePicture: 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-970-80.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo-user'] }
    }, {});
  }
};