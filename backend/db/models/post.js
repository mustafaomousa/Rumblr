'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 99]
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255]
      }
    },
    makeId: DataTypes.INTEGER,
    modelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.Make, { foreignKey: 'makeId' });
    Post.belongsTo(models.Model, { foreignKey: 'modelId' });
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Tag, { foreignKey: 'postId' });
  };
  return Post;
};