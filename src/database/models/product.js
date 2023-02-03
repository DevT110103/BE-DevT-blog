'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Thumbnail, {
        foreignKey: 'thumbnail_id',
        as: 'thumbnail',
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }

  Product.init(
    {
      title: DataTypes.STRING,
      sub_title: DataTypes.STRING,
      desc: DataTypes.STRING,
      thumbnail_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
