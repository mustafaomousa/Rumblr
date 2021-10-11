"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 255],
        },
      },
      userId: DataTypes.INTEGER,
    },
    {}
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId", onDelete: "cascade" });
    Post.belongsToMany(models.Tag, {
      through: "TagJoins",
      foreignKey: "postId",
      onDelete: "cascade",
    });
    Post.hasMany(models.RerumbleJoin, {
      foreignKey: "postId",
      onDelete: "cascade",
    });
    Post.hasMany(models.Like, { foreignKey: "postId" });
  };
  return Post;
};
