'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagJoin = sequelize.define('TagJoin', {
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  TagJoin.associate = function (models) {
  };
  return TagJoin;
};