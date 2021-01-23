'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 30]
      }
    },
    makeId: DataTypes.INTEGER
  }, {});
  Model.associate = function (models) {
    Model.belongsTo(models.Make, { foreignKey: 'makeId' });
    Model.hasMany(models.Post, { foreignKey: 'makeId' });
  };
  return Model;
};