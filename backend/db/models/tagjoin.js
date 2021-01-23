'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagJoin = sequelize.define('TagJoin', {
    tagId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  TagJoin.associate = function (models) {
    TagJoin.belongsTo(models.Tag, { foreignKey: 'tagId' });
    TagJoin.belongsTo(models.Post, { foregnKey: 'postId' });
  };
  return TagJoin;
};