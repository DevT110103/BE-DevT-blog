import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('blog-api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected successfully!');
  } catch {
    console.log('Connected fail!');
  }
};

export default connectDB;
