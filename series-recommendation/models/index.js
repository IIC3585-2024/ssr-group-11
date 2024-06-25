import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import Series from './series.js';
import Review from './review.js';
import configFile from '../config/config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
  Series: Series.init(sequelize, Sequelize),
  Review: Review.init(sequelize, Sequelize),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = models;

export default db;

