import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Product from './product';

const Category = db.define('Category', {
  name: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
});

export default Category;
