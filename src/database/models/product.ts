import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Category from './category';

const Product = db.define('Product', {
  name: DataTypes.STRING,
  seo_name: DataTypes.STRING,
  link: DataTypes.STRING,
  desc: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  view_amount: DataTypes.INTEGER,
  category_id: DataTypes.INTEGER,
});

export default Product;
