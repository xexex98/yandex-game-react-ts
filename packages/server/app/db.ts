import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

dotenv.config()

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  dialect: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
};

export const sequelize = new Sequelize(sequelizeOptions);
