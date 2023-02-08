import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.USER_NAME || '', process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected successfully!');
  } catch (e) {
    console.log('e ->', e);

    console.log('Connected fail!');
  }
};

export default connectDB;
