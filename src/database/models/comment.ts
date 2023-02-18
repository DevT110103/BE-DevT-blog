import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import User from './user';

const Comment = db.define('Comment', {
  post_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  detail: DataTypes.STRING,
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

export default Comment;
