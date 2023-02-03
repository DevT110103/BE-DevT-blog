'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thumbnail extends Model {
    static associate(models) {
      Thumbnail.hasMany(models.Category, {
        foreignKey: 'thumbnail_id',
        as: 'category',
      });
      Thumbnail.hasMany(models.Product, {
        foreignKey: 'thumbnail_id',
        as: 'product',
      });
    }
  }
  Thumbnail.init(
    {
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Thumbnail',
    }
  );
  return Thumbnail;
};
