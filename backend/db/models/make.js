'use strict';
module.exports = (sequelize, DataTypes) => {
  const Make = sequelize.define('Make', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    }
  }, {});
  Make.associate = function (models) {
    Make.hasMany(models.Post, { foreignKey: 'makeId' });
    Make.hasMany(models.Model, { foreignKey: 'modelId' });
  };
  return Make;
};