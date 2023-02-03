'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.Thumbnail, {
        foreignKey: 'thumbnail_id',
        as: 'thumbnail',
      });
      Category.hasMany(models.Product, {
        foreignKey: 'category_id',
        as: 'product',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      thumbnail_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
