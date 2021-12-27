"use strict";
const faker = require("faker");
const { User } = require("../models");

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let demoPosts = [];
    let demoImages = [
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/audiq8demoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/bentleycontinentaldemoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/bmwx5demoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/fpacesvrdemoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/genesisg80demoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/genesisg90demoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/lexuslxdemoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/rangeroverdemoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/taycangtsdemoimage.jpeg",
      "https://rumblr-app.s3.us-east-2.amazonaws.com/demoimages/teslamodelxdemoimage.webp",
    ];
    let users = await User.findAll();

    for (let i = 0; i < 10; i++) {
      let user = users[i];
      demoImages.map((demoImage) => {
        let post = {
          content: demoImage,
          body: faker.lorem.sentence(),
          userId: user.id,
          createdAt: randomDate(new Date(2012, 0, 1), new Date()),
        };
        demoPosts.push(post);
      });
    }
    return queryInterface.bulkInsert("Posts", demoPosts);
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
    return queryInterface.bulkDelete("Posts", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
