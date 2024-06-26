import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import Serie from './serie.js';
import Review from './review.js';
import configFile from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
  });
}

// Initialize models
const models = {
  Serie: Serie.init(sequelize, Sequelize),
  Review: Review.init(sequelize, Sequelize),
};

// Associate models if associate method is available
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db = {
  ...models,
  sequelize,
  Sequelize,
};

export default db;