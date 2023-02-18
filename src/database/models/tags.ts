import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Post from './post';

const Tag = db.define('Tag', {
  name: DataTypes.STRING,
  post_id: DataTypes.INTEGER,
  color: DataTypes.STRING,
});

Tag.belongsTo(Post, {
  foreignKey: 'post_id',
});

export default Tag;
