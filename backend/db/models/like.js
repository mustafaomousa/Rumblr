"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {}, {});
  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "cascade",
      as: "likes",
    });
  };
  return Like;
};
