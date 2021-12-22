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
    },
    {}
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Like, { foreignKey: "postId" });
  };
  return Post;
};
