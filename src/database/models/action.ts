import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Product from './product';
import User from './user';

const Action = db.define('Action', {
  user_id: DataTypes.INTEGER,
  post_id: DataTypes.INTEGER,
});

Action.belongsTo(User, {
  foreignKey: 'user_id',
});

Action.belongsTo(User, {
  foreignKey: 'post_id',
});

export default Action;
