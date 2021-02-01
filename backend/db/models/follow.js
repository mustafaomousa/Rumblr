'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followId: DataTypes.INTEGER
  }, {});
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { foreignKey: 'userId' });
    Follow.belongsTo(models.User, { foreignKey: 'followId' });
  };
  return Follow;
};