import { Sequelize } from 'sequelize';

const PORT = process.env.POSTGRES_PORT || 5432;

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'postgres',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres',
  {
    host: `localhost:${PORT}`,
    dialect: 'postgres',
  }
);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
