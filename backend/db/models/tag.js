'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20]
      },
    }
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
  };
  return Tag;
};