"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoUsers = [];
    demoUsers.push({
      username: "demo-user",
      bio: faker.lorem.sentences(),
      email: "demo@demouser.com",
      profilePicture: `https://ui-avatars.com/api/?size=548&name=demo+user&background=random`,
      hashedPassword: bcrypt.hashSync("password"),
    });
    for (let i = 0; i < 9; i++) {
      let randomPerson = faker.helpers.createCard();
      let randomPersonObject = {
        username: randomPerson.username,
        email: randomPerson.email,
        bio: faker.lorem.sentences(),
        profilePicture: `https://ui-avatars.com/api/?size=548&name=${
          randomPerson.name.split(" ")[0]
        }+${randomPerson.name.split(" ")[1]}&background=random`,
        hashedPassword: bcrypt.hashSync("password"),
      };
      demoUsers.push(randomPersonObject);
    }
    return queryInterface.bulkInsert("Users", demoUsers);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
