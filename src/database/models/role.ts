import { DataTypes } from 'sequelize';
import { sequelize as db } from '../../configs/connectDatabase';

const Role = db.define('Role', {
  name: DataTypes.STRING,
});

export default Role;
