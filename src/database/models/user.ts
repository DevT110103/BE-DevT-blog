import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';
import Role from './role';

const User = db.define('User', {
  last_name: DataTypes.STRING,
  first_name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  address: DataTypes.STRING,
  password: DataTypes.STRING,
  role_id: DataTypes.INTEGER,
  post_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  detail: DataTypes.STRING,
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
});

export default User;
