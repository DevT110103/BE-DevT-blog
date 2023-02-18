import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Product from './product';

const Post = db.define('Post', {
  title: DataTypes.STRING,
  sub_title: DataTypes.STRING,
  image: DataTypes.STRING,
  desc: DataTypes.STRING,
  view_count: DataTypes.STRING,
  category_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
});

export default Post;
